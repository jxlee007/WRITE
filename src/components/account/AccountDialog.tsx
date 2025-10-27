import { useEffect, useState, type ComponentType } from "react";
import { UserProfile, SignOutButton } from "@clerk/clerk-react";
import type { Appearance } from "@clerk/types";
import {
	CreditCard,
	KeyRound,
	LogOut,
	ShieldCheck,
	User as UserIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

type AccountTab = {
	value: string;
	label: string;
	description: string;
	icon: ComponentType<{ className?: string }>;
};

const accountTabs: AccountTab[] = [
	{
		value: "profile",
		label: "Profile",
		description: "Personal details and identity",
		icon: UserIcon,
	},
	{
		value: "security",
		label: "Security",
		description: "Sessions, MFA, and recovery",
		icon: ShieldCheck,
	},
	{
		value: "billing",
		label: "Billing",
		description: "Plan, usage, and invoices",
		icon: CreditCard,
	},
	{
		value: "api",
		label: "API",
		description: "Image generation webhooks",
		icon: KeyRound,
	},
];

export interface AccountDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	defaultTab?: AccountTab["value"];
}

const profileAppearance: Appearance = {
	elements: {
		rootBox: "w-full",
		card: "bg-transparent shadow-none border-none p-0",
		navbar: "hidden",
		navbarMobileMenuButton: "hidden",
		footer: "hidden",
		page: "bg-transparent text-foreground",
		profileSection: "bg-muted/30 border-none ",
		profileSectionPrimaryButton: "bg-primary/90 hover:bg-primary text-primary-foreground border-none",
		profileSectionSecondaryButton: "border-none hover:bg-muted/60",
		headerTitle: "text-xl font-semibold text-foreground",
		headerSubtitle: "text-sm text-muted-foreground",
		formFieldInput: "bg-muted/40 border-none rounded-lg text-foreground",
		formFieldLabel: "text-sm font-medium text-foreground",
		formButtonPrimary: "bg-primary hover:bg-primary/90 text-primary-foreground border-none",
		dividerLine: "bg-border/40",
	},
	variables: {
		colorBackground: "hsl(var(--background))",
		colorText: "hsl(var(--foreground))",
		colorPrimary: "hsl(var(--primary))",
		colorInputBackground: "hsl(var(--muted))",
		colorInputText: "hsl(var(--foreground))",
		borderRadius: "1.25rem",
	},
};

const mockInvoices = [
	{
		id: "INV-2045",
		period: "Aug 2025",
		total: "$42.00",
		status: "Paid",
	},
	{
		id: "INV-2044",
		period: "Jul 2025",
		total: "$42.00",
		status: "Paid",
	},
	{
		id: "INV-2043",
		period: "Jun 2025",
		total: "$38.00",
		status: "Paid",
	},
];

export const AccountDialog = ({ open, onOpenChange, defaultTab = "profile" }: AccountDialogProps) => {
	const [activeTab, setActiveTab] = useState<AccountTab["value"]>(defaultTab);

	useEffect(() => {
		if (!open) {
			setActiveTab(defaultTab);
		}
	}, [open, defaultTab]);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent
				className="max-w-[1200px] border border-border/60 bg-[hsl(var(--background))]/95 p-0 text-foreground shadow-2xl backdrop-blur-xl"
				aria-describedby={undefined}
			>
				<Tabs value={activeTab} onValueChange={setActiveTab} className="flex h-[680px] flex-col md:flex-row overflow-hidden">
					{/* Sidebar Navigation - Professional dashboard style */}
					<aside className="flex w-full flex-col border-b border-border/60 bg-[hsl(var(--sidebar-bg))]/90 p-6 md:w-64 md:border-b-0 md:border-r">
						<div className="space-y-1 pb-8">
							<h2 className="text-2xl font-bold tracking-tight text-foreground">Account</h2>
							<p className="text-sm text-muted-foreground">Professional dashboard for account management.</p>
						</div>

						{/* Mobile dropdown */}
						<div className="md:hidden">
							<label className="text-xs uppercase tracking-wide text-muted-foreground">Navigate</label>
							<select
								className="mt-2 w-full rounded-lg border border-border/60 bg-[hsl(var(--background))] px-3 py-2 text-sm text-foreground transition hover:border-border/80"
								value={activeTab}
								onChange={(event) => setActiveTab(event.target.value)}
							>
								{accountTabs.map((tab) => (
									<option key={tab.value} value={tab.value}>
										{tab.label}
									</option>
								))}
							</select>
						</div>

						{/* Desktop tab list */}
						<TabsList className="hidden h-auto flex-1 flex-col gap-1 rounded-xl bg-transparent p-0 md:flex">
							{accountTabs.map((tab) => {
								const Icon = tab.icon;
								const isActive = activeTab === tab.value;

								return (
									<TabsTrigger
										key={tab.value}
										value={tab.value}
										className={cn(
											"group flex items-start justify-start rounded-lg border border-transparent px-3 py-3 text-left transition duration-200",
											"hover:border-border/80 hover:bg-muted/40",
											isActive && "border-primary/60 bg-primary/10 shadow-[0_0_0_1px_hsl(var(--primary)/0.4)]",
										)}
									>
										<div className="flex items-start gap-3 w-full">
											<span
												className={cn(
													"flex h-8 w-8 items-center justify-center rounded-md bg-muted/60 text-muted-foreground transition flex-shrink-0 mt-0.5",
													isActive && "bg-primary/20 text-primary",
												)}
											>
												<Icon className="h-4 w-4" />
											</span>
											<div className="flex flex-col min-w-0">
												<span className="text-sm font-semibold leading-tight text-foreground">{tab.label}</span>
												<span className="text-xs text-muted-foreground truncate">{tab.description}</span>
											</div>
										</div>
									</TabsTrigger>
								);
							})}
						</TabsList>

						{/* Footer info - Desktop only */}
						<div className="mt-6 hidden md:block space-y-4">
							<Separator className="bg-border/60" />
							<div className="flex items-center gap-3 rounded-lg border border-border/60 bg-muted/20 p-3">
								<div className="flex flex-col text-sm leading-tight">
									<span className="font-semibold text-foreground">Starter Plan</span>
									<span className="text-xs text-muted-foreground">$39/month</span>
								</div>
								<Badge variant="outline" className="ml-auto border-primary/60 text-xs text-primary font-medium">
									58% used
								</Badge>
							</div>

							<div className="flex items-center gap-2 text-xs text-muted-foreground">
								<ShieldCheck className="h-4 w-4 text-primary flex-shrink-0" />
								<span>Production ready</span>
							</div>

							<SignOutButton redirectUrl="/sign-in">
								<Button
									variant="outline"
									className="w-full justify-center gap-2 border-border/60 bg-muted/40 text-muted-foreground transition hover:border-destructive/60 hover:bg-destructive/10 hover:text-destructive"
								>
									<LogOut className="h-4 w-4" />
									Sign out
								</Button>
							</SignOutButton>
						</div>
					</aside>

					{/* Main Content Area */}
					<div className="flex flex-1 flex-col overflow-hidden relative">
						<ScrollArea className="h-full">
							<div className="flex flex-col gap-8 p-6 md:p-8">
								{/* Profile Tab */}
								<TabsContent value="profile" className="mt-0 space-y-6">
									<div className="space-y-2">
										<h3 className="text-2xl font-bold text-foreground">Profile Settings</h3>
										<p className="text-sm text-muted-foreground">Manage your personal information and preferences</p>
									</div>
									<UserProfile appearance={profileAppearance} routing="virtual" />
								</TabsContent>

								{/* Security Tab */}
								<TabsContent value="security" className="mt-0 space-y-6">
									<div className="space-y-2">
										<h3 className="text-2xl font-bold text-foreground">Security Controls</h3>
										<p className="text-sm text-muted-foreground">
											Manage authentication, multi-factor verification, and device sessions
										</p>
									</div>

									<Card className="bg-muted/30 shadow-none">
										<CardHeader className="flex flex-row items-center justify-between space-y-0">
											<div>
												<CardTitle className="text-base">Two-factor Authentication</CardTitle>
												<CardDescription>Add an extra layer of security to your account.</CardDescription>
											</div>
											<Badge variant="outline" className="border-emerald-500/50 bg-emerald-500/10 text-emerald-400 font-medium">
												Enabled
											</Badge>
										</CardHeader>
										<CardContent className="space-y-4">
											<p className="text-sm text-muted-foreground">
												Your account is protected with an authenticator app. Each time you sign in, you'll be asked to enter a code
												from your trusted device.
											</p>
											<div className="flex items-center justify-between rounded-lg bg-muted/20 p-4">
												<div>
													<p className="font-medium text-foreground text-sm">Authenticator app</p>
													<p className="text-xs text-muted-foreground">Updated 3 weeks ago</p>
												</div>
												<Button variant="outline" size="sm" className="border-border/40">
													Manage
												</Button>
											</div>
										</CardContent>
									</Card>

									<Card className="bg-muted/30 shadow-none">
										<CardHeader>
											<CardTitle className="text-base">Account Recovery</CardTitle>
											<CardDescription>Configure backup contact methods to regain access if needed.</CardDescription>
										</CardHeader>
										<CardContent className="space-y-4">
											<div className="flex items-center justify-between rounded-lg bg-muted/20 p-4">
												<div>
													<p className="font-medium text-foreground text-sm">Recovery email</p>
													<p className="text-xs text-muted-foreground">jimmyfalco007@gmail.com</p>
												</div>
												<Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
													Update
												</Button>
											</div>

											<div className="flex items-center justify-between rounded-lg bg-muted/20 p-4">
												<div>
													<p className="font-medium text-foreground text-sm">Sign-in alerts</p>
													<p className="text-xs text-muted-foreground">Email notifications on new device logins</p>
												</div>
												<Switch defaultChecked aria-readonly className="data-[state=checked]:bg-primary" />
											</div>
										</CardContent>
									</Card>
								</TabsContent>

								{/* Billing Tab */}
								<TabsContent value="billing" className="mt-0 space-y-6">
									<div className="space-y-2">
										<h3 className="text-2xl font-bold text-foreground">Billing & Plans</h3>
										<p className="text-sm text-muted-foreground">
											Manage your subscription, payment method, and invoices
										</p>
									</div>

									<div className="grid gap-4 md:grid-cols-2">
										<Card className="bg-gradient-to-br from-primary/5 to-muted/30 shadow-none">
											<CardHeader>
												<CardTitle className="text-base">Current Plan</CardTitle>
												<CardDescription>Starter · $39 per month</CardDescription>
											</CardHeader>
											<CardContent className="space-y-4">
												<ul className="space-y-2 text-sm text-muted-foreground">
													<li className="flex items-center gap-2">
														<span className="h-1.5 w-1.5 rounded-full bg-primary" />
														3 team members
													</li>
													<li className="flex items-center gap-2">
														<span className="h-1.5 w-1.5 rounded-full bg-primary" />
														Clerk authentication
													</li>
													<li className="flex items-center gap-2">
														<span className="h-1.5 w-1.5 rounded-full bg-primary" />
														50k operations/month
													</li>
												</ul>
												<div className="pt-2">
													<div className="mb-2 flex items-center justify-between text-xs">
														<span className="text-muted-foreground">Usage</span>
														<span className="font-medium text-foreground">58%</span>
													</div>
													<div className="h-2 rounded-full bg-muted overflow-hidden">
														<div className="h-full w-[58%] bg-primary" />
													</div>
													<p className="text-xs text-muted-foreground mt-1">Resets on Sep 1, 2025</p>
												</div>
											</CardContent>
											<CardFooter>
												<Button size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
													Upgrade Plan
												</Button>
											</CardFooter>
										</Card>

										<Card className="bg-muted/30 shadow-none">
											<CardHeader>
												<CardTitle className="text-base">Payment Method</CardTitle>
												<CardDescription>Visa ending •••• 2542</CardDescription>
											</CardHeader>
											<CardContent className="space-y-4">
												<div className="rounded-lg bg-muted/20 p-3">
													<p className="text-sm font-medium text-foreground">Visa Debit Card</p>
													<p className="text-xs text-muted-foreground">Expires 08/27</p>
												</div>
												<p className="text-xs text-muted-foreground">
													Payments processed securely through Stripe. Update your card to prevent interruptions.
												</p>
												<Button variant="outline" size="sm" className="w-full border-border/40">
													Update Payment Method
												</Button>
											</CardContent>
										</Card>
									</div>

									<Card className="bg-muted/30 shadow-none">
										<CardHeader>
											<CardTitle className="text-base">Invoice History</CardTitle>
											<CardDescription>Download receipts for past billing cycles</CardDescription>
										</CardHeader>
										<CardContent className="space-y-2">
											{mockInvoices.map((invoice) => (
												<div
													key={invoice.id}
													className="flex items-center gap-4 rounded-lg bg-muted/20 p-4"
												>
													<div className="flex-1">
														<p className="font-medium text-sm text-foreground">{invoice.period}</p>
														<p className="text-xs text-muted-foreground">Invoice {invoice.id}</p>
													</div>
													<p className="text-sm font-medium text-foreground">{invoice.total}</p>
													<Badge variant="outline" className="border-emerald-500/50 bg-emerald-500/10 text-emerald-400 text-xs">
														{invoice.status}
													</Badge>
													<Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
														Download
													</Button>
												</div>
											))}
										</CardContent>
									</Card>
								</TabsContent>

								{/* API Tab - Image Generation Only */}
								<TabsContent value="api" className="mt-0 space-y-6">
									<div className="space-y-2">
										<h3 className="text-2xl font-bold text-foreground">Image Generation API</h3>
										<p className="text-sm text-muted-foreground">
											Configure webhooks for AI image generation services
										</p>
									</div>

									<Card className="bg-muted/30 shadow-none">
										<CardHeader>
											<CardTitle className="text-base">Image Generation Webhooks</CardTitle>
											<CardDescription>Connect to Google Imagen, Stability AI, DALL-E, or other image generation APIs</CardDescription>
										</CardHeader>
										<CardContent className="space-y-4">
											<div className="space-y-2">
												<label className="text-sm font-medium text-foreground">API Provider</label>
												<select className="w-full rounded-lg bg-muted/20 px-3 py-2 text-sm text-foreground border border-border/40 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
													<option value="google">Google Cloud Imagen API</option>
													<option value="stability">Stability AI</option>
													<option value="openai">OpenAI DALL-E</option>
													<option value="replicate">Replicate (Banana Model)</option>
													<option value="midjourney">Midjourney</option>
													<option value="custom">Custom API</option>
												</select>
											</div>

											<div className="space-y-2">
												<label className="text-sm font-medium text-foreground">API Endpoint URL</label>
												<div className="flex items-center gap-2">
													<input
														type="text"
														placeholder="https://api.example.com/generate-image"
														className="flex-1 rounded-lg bg-muted/20 px-3 py-2 text-xs text-foreground font-mono border border-border/40 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
													/>
													<Button variant="outline" size="sm" className="border-border/40 flex-shrink-0">
														Update
													</Button>
												</div>
											</div>

											<div className="space-y-2">
												<label className="text-sm font-medium text-foreground">API Key</label>
												<div className="flex items-center gap-2">
													<input
														type="password"
														placeholder="sk_••••••••••••••••"
														className="flex-1 rounded-lg bg-muted/20 px-3 py-2 text-xs text-foreground font-mono border border-border/40 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
													/>
													<Button variant="outline" size="sm" className="border-border/40 flex-shrink-0">
														Save
													</Button>
												</div>
											</div>
										</CardContent>
									</Card>
								</TabsContent>
							</div>
						</ScrollArea>
					</div>
				</Tabs>
			</DialogContent>
		</Dialog>
	);
};

AccountDialog.displayName = "AccountDialog";
