import { useState } from 'react';
import { jsPDF } from 'jspdf';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import { convert } from 'html-to-text';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';
import { FileDown, FileText, FileType, FileImage } from 'lucide-react';
import { toast } from 'sonner';

interface ExportMenuProps {
  content: string; // HTML content from TipTap editor
  title?: string; // Document title
  format?: 'novel' | 'screenplay' | 'stage_play' | 'comic_script';
}

export function ExportMenu({ content, title = 'Document', format = 'novel' }: ExportMenuProps) {
  const [isExporting, setIsExporting] = useState(false);

  // Convert HTML to plain text with formatting
  const htmlToPlainText = (html: string): string => {
    return convert(html, {
      wordwrap: false,
      preserveNewlines: true,
      selectors: [
        { selector: 'h1', format: 'heading', options: { uppercase: true } },
        { selector: 'h2', format: 'heading', options: { uppercase: false } },
        { selector: 'p', format: 'block' },
        { selector: 'strong', format: 'inline' },
        { selector: 'em', format: 'inline' },
        { selector: 'ul', format: 'unorderedList' },
        { selector: 'ol', format: 'orderedList' },
      ],
    });
  };

  // Export as TXT
  const exportAsTXT = () => {
    try {
      setIsExporting(true);
      
      const plainText = htmlToPlainText(content);
      const blob = new Blob([plainText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title}.txt`;
      a.click();
      URL.revokeObjectURL(url);
      
      toast.success('Document exported as TXT');
    } catch (error) {
      toast.error('Failed to export as TXT');
      console.error(error);
    } finally {
      setIsExporting(false);
    }
  };

  // Export as PDF
  const exportAsPDF = () => {
    try {
      setIsExporting(true);
      
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margins = { top: 20, right: 20, bottom: 20, left: 20 };
      const maxLineWidth = pageWidth - margins.left - margins.right;
      
      let yPosition = margins.top;
      
      // Parse HTML content
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      
      const processNode = (node: Node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent?.trim();
          if (!text) return;
          
          doc.setFontSize(12);
          const lines = doc.splitTextToSize(text, maxLineWidth);
          
          lines.forEach((line: string) => {
            if (yPosition + 10 > pageHeight - margins.bottom) {
              doc.addPage();
              yPosition = margins.top;
            }
            doc.text(line, margins.left, yPosition);
            yPosition += 7;
          });
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as HTMLElement;
          
          switch (element.tagName.toLowerCase()) {
            case 'h1':
              if (yPosition + 20 > pageHeight - margins.bottom) {
                doc.addPage();
                yPosition = margins.top;
              }
              doc.setFontSize(20);
              doc.setFont(undefined, 'bold');
              doc.text(element.textContent || '', margins.left, yPosition);
              doc.setFont(undefined, 'normal');
              yPosition += 15;
              break;
              
            case 'h2':
              if (yPosition + 15 > pageHeight - margins.bottom) {
                doc.addPage();
                yPosition = margins.top;
              }
              doc.setFontSize(16);
              doc.setFont(undefined, 'bold');
              doc.text(element.textContent || '', margins.left, yPosition);
              doc.setFont(undefined, 'normal');
              yPosition += 12;
              break;
              
            case 'h3':
              if (yPosition + 12 > pageHeight - margins.bottom) {
                doc.addPage();
                yPosition = margins.top;
              }
              doc.setFontSize(14);
              doc.setFont(undefined, 'bold');
              doc.text(element.textContent || '', margins.left, yPosition);
              doc.setFont(undefined, 'normal');
              yPosition += 10;
              break;
              
            case 'p':
              const pText = element.textContent?.trim();
              if (pText) {
                doc.setFontSize(12);
                const lines = doc.splitTextToSize(pText, maxLineWidth);
                
                lines.forEach((line: string) => {
                  if (yPosition + 10 > pageHeight - margins.bottom) {
                    doc.addPage();
                    yPosition = margins.top;
                  }
                  doc.text(line, margins.left, yPosition);
                  yPosition += 7;
                });
                yPosition += 5; // Extra space after paragraph
              }
              break;
              
            default:
              // Process child nodes
              Array.from(element.childNodes).forEach(processNode);
          }
        }
      };
      
      // Add title
      doc.setFontSize(24);
      doc.setFont(undefined, 'bold');
      doc.text(title, margins.left, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 20;
      
      // Process content
      Array.from(tempDiv.childNodes).forEach(processNode);
      
      doc.save(`${title}.pdf`);
      toast.success('Document exported as PDF');
    } catch (error) {
      toast.error('Failed to export as PDF');
      console.error(error);
    } finally {
      setIsExporting(false);
    }
  };

  // Export as DOCX
  const exportAsDOCX = async () => {
    try {
      setIsExporting(true);
      
      const paragraphs: Paragraph[] = [];
      
      // Parse HTML content
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      
      const processNode = (node: Node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as HTMLElement;
          const text = element.textContent?.trim() || '';
          
          switch (element.tagName.toLowerCase()) {
            case 'h1':
              paragraphs.push(
                new Paragraph({
                  text,
                  heading: HeadingLevel.HEADING_1,
                  spacing: { before: 240, after: 120 },
                })
              );
              break;
              
            case 'h2':
              paragraphs.push(
                new Paragraph({
                  text,
                  heading: HeadingLevel.HEADING_2,
                  spacing: { before: 200, after: 100 },
                })
              );
              break;
              
            case 'h3':
              paragraphs.push(
                new Paragraph({
                  text,
                  heading: HeadingLevel.HEADING_3,
                  spacing: { before: 160, after: 80 },
                })
              );
              break;
              
            case 'p':
              if (text) {
                const children: TextRun[] = [];
                
                // Check for formatting
                const hasStrong = element.querySelector('strong');
                const hasEm = element.querySelector('em');
                
                if (hasStrong || hasEm) {
                  // Process inline formatting
                  Array.from(element.childNodes).forEach((child) => {
                    if (child.nodeType === Node.TEXT_NODE) {
                      const childText = child.textContent?.trim();
                      if (childText) {
                        children.push(new TextRun(childText));
                      }
                    } else if (child.nodeType === Node.ELEMENT_NODE) {
                      const childElement = child as HTMLElement;
                      const childText = childElement.textContent?.trim();
                      if (childText) {
                        children.push(
                          new TextRun({
                            text: childText,
                            bold: childElement.tagName.toLowerCase() === 'strong',
                            italics: childElement.tagName.toLowerCase() === 'em',
                          })
                        );
                      }
                    }
                  });
                } else {
                  children.push(new TextRun(text));
                }
                
                paragraphs.push(
                  new Paragraph({
                    children,
                    spacing: { before: 120, after: 120 },
                  })
                );
              }
              break;
              
            default:
              // Process child nodes
              Array.from(element.childNodes).forEach(processNode);
          }
        }
      };
      
      // Add title
      paragraphs.push(
        new Paragraph({
          text: title,
          heading: HeadingLevel.TITLE,
          spacing: { after: 240 },
        })
      );
      
      // Process content
      Array.from(tempDiv.childNodes).forEach(processNode);
      
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: paragraphs,
          },
        ],
      });
      
      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title}.docx`;
      a.click();
      URL.revokeObjectURL(url);
      
      toast.success('Document exported as DOCX');
    } catch (error) {
      toast.error('Failed to export as DOCX');
      console.error(error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          disabled={isExporting}
          className="gap-2"
        >
          <FileDown className="h-4 w-4" />
          {isExporting ? 'Exporting...' : 'Export'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={exportAsTXT}>
          <FileText className="mr-2 h-4 w-4" />
          Export as TXT
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportAsPDF}>
          <FileType className="mr-2 h-4 w-4" />
          Export as PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportAsDOCX}>
          <FileImage className="mr-2 h-4 w-4" />
          Export as DOCX
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled className="text-xs text-muted-foreground">
          {format.replace('_', ' ').toUpperCase()} format
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
