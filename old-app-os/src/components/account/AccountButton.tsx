import { useMemo, useState } from "react";
import { useUser } from "@clerk/clerk-react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AccountDialog } from "./AccountDialog";

const getInitials = (fullName?: string | null) => {
	if (!fullName) return "";
	return fullName
		.split(" ")
		.filter(Boolean)
		.slice(0, 2)
		.map((segment) => segment.charAt(0).toUpperCase())
		.join("");
};

export const AccountButton = () => {
	const { user, isLoaded } = useUser();
	const [open, setOpen] = useState(false);

	const initials = useMemo(() => getInitials(user?.fullName ?? user?.username), [user?.fullName, user?.username]);

	return (
		<>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						variant="ghost"
						size="icon"
						disabled={!isLoaded}
						onClick={() => setOpen(true)}
									className="shine-hover h-10 w-10 rounded-md border border-border/70 bg-[hsl(var(--sidebar-bg))] text-muted-foreground transition hover:border-primary/60 hover:bg-primary/5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
					>
						<Avatar className="h-8 w-8">
							<AvatarImage src={user?.imageUrl} alt={user?.fullName ?? "Account"} />
							<AvatarFallback className="bg-muted text-xs uppercase text-muted-foreground">
								{initials || "?"}
							</AvatarFallback>
						</Avatar>
					</Button>
				</TooltipTrigger>
				<TooltipContent side="right" className="bg-popover text-xs text-muted-foreground">
					Account
				</TooltipContent>
			</Tooltip>

			<AccountDialog open={open} onOpenChange={setOpen} />
		</>
	);
};

AccountButton.displayName = "AccountButton";

