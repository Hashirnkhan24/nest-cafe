"use client";

import { useState, useEffect, useRef } from "react";
import { Phone, MapPin, MessageSquare, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingActions() {
	const [isOpen, setIsOpen] = useState(false);
	const [isVisible, setIsVisible] = useState(true);
	const footerObserverRef = useRef<IntersectionObserver | null>(null);

	// Trigger brief haptic vibration if supported (from blueprint: navigator.vibrate(10))
	const triggerHaptic = () => {
		if (typeof window !== "undefined" && navigator.vibrate) {
			navigator.vibrate(10);
		}
	};

	const handleToggle = () => {
		triggerHaptic();
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		// Setup observer to auto-hide actions when footer enters viewport (from blueprint)
		const handleFooterIntersection = (entries: IntersectionObserverEntry[]) => {
			const footerEntry = entries[0];
			if (footerEntry.isIntersecting) {
				setIsVisible(false);
			} else {
				setIsVisible(true);
			}
		};

		footerObserverRef.current = new IntersectionObserver(
			handleFooterIntersection,
			{
				threshold: 0.1,
			}
		);

		// Locate the footer element
		const footerElement = document.querySelector("footer");
		if (footerElement && footerObserverRef.current) {
			footerObserverRef.current.observe(footerElement);
		}

		return () => {
			if (footerObserverRef.current) {
				footerObserverRef.current.disconnect();
			}
		};
	}, []);

	if (!isVisible) return null;

	const actions = [
		{
			id: "call",
			label: "Call Us",
			icon: Phone,
			href: "tel:+919619814650",
		},
		{
			id: "directions",
			label: "Directions",
			icon: MapPin,
			href: "https://maps.app.goo.gl/qFwucVmXRwN7SnwQ7",
			target: "_blank",
		},
		{
			id: "whatsapp",
			label: "WhatsApp",
			icon: MessageSquare,
			href: "https://wa.me/919619814650",
			target: "_blank",
		},
	];

	return (
		<div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 sm:hidden">
			{/* Expanded Quick Actions Panel */}
			<AnimatePresence>
				{isOpen && (
					<div className="flex flex-col items-end gap-3">
						{actions.map((act, index) => {
							const Icon = act.icon;
							return (
								<motion.a
									key={act.id}
									href={act.href}
									target={act.target}
									rel={act.target ? "noopener noreferrer" : undefined}
									onClick={triggerHaptic}
									initial={{ opacity: 0, y: 15, scale: 0.8 }}
									animate={{ opacity: 1, y: 0, scale: 1 }}
									exit={{ opacity: 0, y: 15, scale: 0.8 }}
									transition={{
										duration: 0.25,
										delay: index * 0.05,
										ease: "easeOut",
									}}
									className="flex items-center gap-2 bg-cream-50 border border-border-subtle p-3 rounded-full shadow-lg text-sage-800"
									aria-label={act.label}
								>
									<span className="text-[10px] uppercase font-bold tracking-wider px-1 text-text-secondary">
										{act.label}
									</span>
									<div className="w-8 h-8 rounded-full bg-sage-100 flex items-center justify-center">
										<Icon size={14} className="text-sage-800" />
									</div>
								</motion.a>
							);
						})}
					</div>
				)}
			</AnimatePresence>

			{/* Primary Floating Action Button (FAB) */}
			<button
				onClick={handleToggle}
				className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl border focus:outline-none transition-colors duration-300 ${
					isOpen
						? "bg-cream-50 text-sage-800 border-border-subtle"
						: "bg-sage-600 text-cream-50 border-sage-500"
				}`}
				aria-label="Toggle Quick Actions"
			>
				{isOpen ? <X size={20} /> : <Menu size={20} />}
			</button>
		</div>
	);
}
