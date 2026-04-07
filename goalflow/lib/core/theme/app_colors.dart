import 'package:flutter/material.dart';

class CategoryColor {
  final Color bg;
  final Color text;
  final Color border;

  const CategoryColor({
    required this.bg,
    required this.text,
    required this.border,
  });
}

class AppColors {
  // Brand
  static const emeraldPrimary = Color(0xFF047857);
  static const emeraldLight = Color(0xFF10B981);
  static const emeraldDark = Color(0xFF065F46);

  // Semantic
  static const error = Color(0xFFEF4444);
  static const warning = Color(0xFFF59E0B);
  static const info = Color(0xFF3B82F6);

  // Backgrounds
  static const bgLight = Color(0xFFFCFDFA);
  static const bgDark = Color(0xFF0F171A);
  static const surfaceDark = Color(0xFF1E293B); // slate-800 approx
  static const surfaceLight = Color(0xFFFFFFFF);

  static CategoryColor forCategory(String cls, bool isDark) {
    return switch (cls) {
      'sleep' => isDark
          ? const CategoryColor(bg: Color(0x661e1b4b), text: Color(0xFFa5b4fc), border: Color(0x4d3730a3)) // indigo-950/40, -300, -800/30
          : const CategoryColor(bg: Color(0xFFe0e7ff), text: Color(0xFF312e81), border: Color(0xFFc7d2fe)), // indigo-100, -900, -200
      'hustle' => isDark
          ? const CategoryColor(bg: Color(0x663b0764), text: Color(0xFFd8b4fe), border: Color(0x4d6b21a8)) // purple-950/40, -300, -800/30
          : const CategoryColor(bg: Color(0xFFf3e8ff), text: Color(0xFF581c87), border: Color(0xFFe9d5ff)), // purple-100, -900, -200
      'write' => isDark
          ? const CategoryColor(bg: Color(0x66451a03), text: Color(0xFFfcd34d), border: Color(0x4d92400e)) // amber-950/40, -300, -800/30
          : const CategoryColor(bg: Color(0xFFfef3c7), text: Color(0xFF78350f), border: Color(0xFFfde68a)), // amber-100, -900, -200
      'fit' => isDark
          ? const CategoryColor(bg: Color(0x66022c22), text: Color(0xFF6ee7b7), border: Color(0x4d065f46)) // emerald-950/40, -300, -800/30
          : const CategoryColor(bg: Color(0xFFd1fae5), text: Color(0xFF065f46), border: Color(0xFFa7f3d0)), // emerald-100, -800, -200
      'prep' => isDark
          ? const CategoryColor(bg: Color(0x66422006), text: Color(0xFFfde047), border: Color(0x4d854d0e)) // yellow-950/40, -300, -800/30
          : const CategoryColor(bg: Color(0xFFfef9c3), text: Color(0xFF713f12), border: Color(0xFFfef08a)), // yellow-100, -900, -200
      'work' => isDark
          ? const CategoryColor(bg: Color(0x66042f2e), text: Color(0xFF5eead4), border: Color(0x4d115e59)) // teal-950/40, -300, -800/30
          : const CategoryColor(bg: Color(0xFFccfbf1), text: Color(0xFF115e59), border: Color(0xFF99f6e4)), // teal-100, -800, -200
      'chore' => isDark
          ? const CategoryColor(bg: Color(0x660f172a), text: Color(0xFFcbd5e1), border: Color(0x4d334155)) // slate-950/40, -300, -700/30
          : const CategoryColor(bg: Color(0xFFf1f5f9), text: Color(0xFF1e293b), border: Color(0xFFe2e8f0)), // slate-100, -800, -200
      'exam' => isDark
          ? const CategoryColor(bg: Color(0x664c0519), text: Color(0xFFfda4af), border: Color(0x4d9f1239)) // rose-950/40, -300, -800/30
          : const CategoryColor(bg: Color(0xFFffe4e6), text: Color(0xFF9f1239), border: Color(0xFFfecdd3)), // rose-100, -800, -200
      'social' => isDark
          ? const CategoryColor(bg: Color(0x66172554), text: Color(0xFF93c5fd), border: Color(0x4d1e40af)) // blue-950/40, -300, -800/30
          : const CategoryColor(bg: Color(0xFFdbeafe), text: Color(0xFF1e40af), border: Color(0xFFbfdbfe)), // blue-100, -800, -200
      'free' || _ => isDark
          ? const CategoryColor(bg: Color(0x660f172a), text: Color(0xFF94a3b8), border: Color(0x4d475569)) // slate-950/40, -400, -600/30
          : const CategoryColor(bg: Color(0xFFe2e8f0), text: Color(0xFF334155), border: Color(0xFFcbd5e1)), // slate-200, -800, -300
    };
  }

  static IconData iconForCategory(String cls) {
    switch (cls) {
      case 'sleep':
        return Icons.nights_stay; // using material icons closest to moon
      case 'hustle':
        return Icons.rocket_launch; // rocket
      case 'write':
        return Icons.edit;
      case 'fit':
        return Icons.fitness_center;
      case 'prep':
        return Icons.headphones;
      case 'work':
        return Icons.work;
      case 'chore':
        return Icons.checklist;
      case 'exam':
        return Icons.menu_book;
      case 'social':
        return Icons.group;
      case 'free':
        return Icons.coffee;
      default:
        return Icons.circle;
    }
  }
}
