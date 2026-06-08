'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, Send, CheckCircle2, AlertCircle } from 'lucide-react';

// Form validation schema from blueprint (Zod schema)
const enquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be under 50 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number (e.g. +919876543210)'),
  eventType: z.enum(['birthday', 'work-meet', 'celebration', 'other'], {
    message: 'Please select an event type',
  }),
  guests: z.number({ message: 'Please enter guest count' }).min(1, 'At least 1 guest required').max(40, 'Our maximum capacity is 40 guests'),
  date: z.string().min(1, 'Please select a preferred date'),
  message: z.string().max(500, 'Message must be under 500 characters').optional(),
});

type EnquiryFormValues = z.infer<typeof enquirySchema>;

export default function Events() {
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      guests: 10,
    },
  });

  const selectedEventType = watch('eventType');

  const onSubmit = async (data: EnquiryFormValues) => {
    setIsSubmitting(true);
    // Simulate Server Action delay (Sanity write + Resend trigger)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitSuccess(true);
    reset();

    // Hide success toast after 5 seconds
    setTimeout(() => {
      setIsSubmitSuccess(false);
    }, 5000);
  };

  return (
    <section id="events" className="py-24 bg-cream-100 relative z-20 border-b border-border-subtle">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Left Column: Context Card */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <span className="text-xs uppercase tracking-[0.2em] text-sage-600 font-bold">Gatherings</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-text-primary tracking-tight">
              Host at The Nest
            </h2>
            <p className="text-sm md:text-base text-text-secondary font-light leading-relaxed">
              Our botanical sanctuary is available for private rentals, corporate workshops, and intimate celebrations. Let's make your next gather memorable.
            </p>
          </div>

          {/* Details Card */}
          <div className="bg-cream-50 border border-border-subtle p-8 rounded-[2rem] flex flex-col gap-6 shadow-sm">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-widest font-bold text-sage-600">Capacity</span>
              <p className="font-serif text-2xl font-bold text-text-primary">Up to 40 Guests</p>
            </div>
            
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase tracking-widest font-bold text-sage-600">Ideal Occasions</span>
              <ul className="text-sm text-text-secondary font-light flex flex-col gap-2.5">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage-500" />
                  Intimate birthdays and family dinners
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage-500" />
                  Creative design workshops and book launches
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage-500" />
                  Quiet corporate team sessions and meetups
                </li>
              </ul>
            </div>

            {/* Custom Visual Photo Stack */}
            <div className="relative w-full h-[140px] bg-sage-50/50 rounded-xl overflow-hidden mt-4 flex items-center justify-center border border-sage-100">
              <div className="absolute left-6 w-24 h-24 rounded-lg overflow-hidden border border-cream-50 shadow transform -rotate-6" style={{ backgroundImage: "url('/images/exp-work.png')", backgroundSize: 'cover' }} />
              <div className="absolute right-6 w-24 h-24 rounded-lg overflow-hidden border border-cream-50 shadow transform rotate-6 z-10" style={{ backgroundImage: "url('/images/hero-bg.png')", backgroundSize: 'cover' }} />
              <div className="z-20 text-[9px] uppercase tracking-widest font-bold text-sage-800 bg-cream-100/90 backdrop-blur-sm px-4 py-2 rounded-full border border-sage-200">
                View Space Gallery
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Enquiry Form */}
        <div id="reserve" className="lg:col-span-7 bg-cream-50 border border-border-subtle p-8 md:p-12 rounded-[2rem] shadow-sm relative">
          
          {/* Success Toast Overlay */}
          <AnimatePresence>
            {isSubmitSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 bg-cream-50/98 backdrop-blur-sm z-30 rounded-[2rem] flex flex-col items-center justify-center p-8 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
                >
                  <CheckCircle2 size={56} className="text-sage-600 mb-4" />
                </motion.div>
                <h3 className="font-serif text-2xl font-bold text-text-primary mb-2">Enquiry Received</h3>
                <p className="text-sm text-text-secondary font-light max-w-sm leading-relaxed mb-6">
                  Thank you for your request. Our events manager will review our calendar and reach out to you via email within 24 hours.
                </p>
                <button
                  onClick={() => setIsSubmitSuccess(false)}
                  className="bg-sage-600 hover:bg-sage-700 text-cream-50 text-xs font-semibold uppercase tracking-widest px-6 py-3 rounded-full"
                >
                  Back to Form
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <h3 className="font-serif text-2xl font-bold text-text-primary mb-6">Enquire Now</h3>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            
            {/* Row 1: Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-wider font-bold text-text-secondary">Name</label>
                <input
                  type="text"
                  placeholder="e.g. Kabir Khan"
                  {...register('name')}
                  className={`w-full bg-cream-100/50 border rounded-full px-5 py-3 text-xs focus:outline-none focus:bg-cream-100 transition-colors ${
                    errors.name ? 'border-rose-400 focus:border-rose-500' : 'border-border-subtle/80 focus:border-sage-500'
                  }`}
                />
                {errors.name && (
                  <span className="text-[10px] text-rose-500 font-semibold flex items-center gap-1 mt-0.5">
                    <AlertCircle size={10} />
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-wider font-bold text-text-secondary">Email</label>
                <input
                  type="email"
                  placeholder="e.g. kabir@domain.com"
                  {...register('email')}
                  className={`w-full bg-cream-100/50 border rounded-full px-5 py-3 text-xs focus:outline-none focus:bg-cream-100 transition-colors ${
                    errors.email ? 'border-rose-400 focus:border-rose-500' : 'border-border-subtle/80 focus:border-sage-500'
                  }`}
                />
                {errors.email && (
                  <span className="text-[10px] text-rose-500 font-semibold flex items-center gap-1 mt-0.5">
                    <AlertCircle size={10} />
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>

            {/* Row 2: Phone & Event Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-wider font-bold text-text-secondary">Phone Number</label>
                <input
                  type="tel"
                  placeholder="e.g. +919876543210"
                  {...register('phone')}
                  className={`w-full bg-cream-100/50 border rounded-full px-5 py-3 text-xs focus:outline-none focus:bg-cream-100 transition-colors ${
                    errors.phone ? 'border-rose-400 focus:border-rose-500' : 'border-border-subtle/80 focus:border-sage-500'
                  }`}
                />
                {errors.phone && (
                  <span className="text-[10px] text-rose-500 font-semibold flex items-center gap-1 mt-0.5">
                    <AlertCircle size={10} />
                    {errors.phone.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-wider font-bold text-text-secondary">Event Type</label>
                <div className="relative">
                  <select
                    value={selectedEventType || ''}
                    onChange={(e) => setValue('eventType', e.target.value as any, { shouldValidate: true })}
                    className={`w-full bg-cream-100/50 border rounded-full px-5 py-3 text-xs focus:outline-none focus:bg-cream-100 transition-colors appearance-none cursor-pointer ${
                      errors.eventType ? 'border-rose-400 focus:border-rose-500' : 'border-border-subtle/80 focus:border-sage-500'
                    }`}
                  >
                    <option value="" disabled>Select event type</option>
                    <option value="birthday">Birthday Party</option>
                    <option value="work-meet">Corporate/Work Meetup</option>
                    <option value="celebration">Private Celebration</option>
                    <option value="other">Other Gathering</option>
                  </select>
                </div>
                {errors.eventType && (
                  <span className="text-[10px] text-rose-500 font-semibold flex items-center gap-1 mt-0.5">
                    <AlertCircle size={10} />
                    {errors.eventType.message}
                  </span>
                )}
              </div>
            </div>

            {/* Row 3: Guest Count & Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-wider font-bold text-text-secondary">Guests Count (Max 40)</label>
                <div className="relative flex items-center">
                  <Users size={12} className="absolute left-4 text-text-muted" />
                  <input
                    type="number"
                    min="1"
                    max="40"
                    placeholder="10"
                    onChange={(e) => setValue('guests', parseInt(e.target.value), { shouldValidate: true })}
                    className={`w-full bg-cream-100/50 border rounded-full pl-10 pr-5 py-3 text-xs focus:outline-none focus:bg-cream-100 transition-colors ${
                      errors.guests ? 'border-rose-400 focus:border-rose-500' : 'border-border-subtle/80 focus:border-sage-500'
                    }`}
                  />
                </div>
                {errors.guests && (
                  <span className="text-[10px] text-rose-500 font-semibold flex items-center gap-1 mt-0.5">
                    <AlertCircle size={10} />
                    {errors.guests.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-wider font-bold text-text-secondary">Preferred Date</label>
                <div className="relative flex items-center">
                  <Calendar size={12} className="absolute left-4 text-text-muted" />
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    {...register('date')}
                    className={`w-full bg-cream-100/50 border rounded-full pl-10 pr-5 py-3 text-xs focus:outline-none focus:bg-cream-100 transition-colors ${
                      errors.date ? 'border-rose-400 focus:border-rose-500' : 'border-border-subtle/80 focus:border-sage-500'
                    }`}
                  />
                </div>
                {errors.date && (
                  <span className="text-[10px] text-rose-500 font-semibold flex items-center gap-1 mt-0.5">
                    <AlertCircle size={10} />
                    {errors.date.message}
                  </span>
                )}
              </div>
            </div>

            {/* Row 4: Message */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-wider font-bold text-text-secondary">Details & Requirements (Optional)</label>
              <textarea
                rows={3}
                placeholder="Share any details about catering preferences, setup requirements, etc."
                {...register('message')}
                className="w-full bg-cream-100/50 border border-border-subtle/80 rounded-2xl px-5 py-3.5 text-xs focus:outline-none focus:border-sage-500 focus:bg-cream-100 transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-sage-600 hover:bg-sage-700 text-cream-50 font-semibold text-xs uppercase tracking-widest py-4 rounded-full flex items-center justify-center gap-2 mt-2 w-full transition-colors shadow-sm disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Submitting Enquiry...</span>
              ) : (
                <>
                  <Send size={12} />
                  Submit Request
                </>
              )}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
