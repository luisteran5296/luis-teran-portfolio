import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  MapPin,
  Mail,
  Phone,
  CheckCircle2,
  Linkedin,
  Github,
  Copy,
  Check,
  MessageSquare,
  ExternalLink,
  RotateCcw,
} from "lucide-react";
import { Input } from "../lightswind/input";
import { Textarea } from "../lightswind/textarea";
import { Button } from "../lightswind/button";
import { useLanguage } from "../../context/LanguageContext";

export const ContactSection = () => {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [submittedData, setSubmittedData] = useState<{ name: string; email: string; message: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const validate = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};

    if (!name.trim()) {
      newErrors.name = "Por favor ingresa tu nombre o el de tu empresa.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Por favor ingresa tu correo electrónico.";
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = "Ingresa un correo electrónico válido (ej. reclutador@empresa.com).";
    }

    if (!message.trim()) {
      newErrors.message = "Por favor describe brevemente los detalles o la propuesta.";
    } else if (message.trim().length < 5) {
      newErrors.message = "El mensaje debe contener al menos 5 caracteres.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getMailSubject = (senderName: string) => `Propuesta Laboral para Luis Terán — ${senderName}`;

  const getMailBody = (senderName: string, senderEmail: string, details: string) =>
    `Hola Luis,\n\nTe contacto desde tu portafolio web con la siguiente propuesta laboral:\n\n` +
    `• Nombre / Empresa: ${senderName}\n` +
    `• Correo de contacto: ${senderEmail}\n\n` +
    `Detalles de la oportunidad / vacante:\n${details}\n\n` +
    `Saludos cordiales,\n${senderName}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const data = { name: name.trim(), email: email.trim(), message: message.trim() };
    setSubmittedData(data);

    // Build URLs
    const subject = getMailSubject(data.name);
    const body = getMailBody(data.name, data.email, data.message);
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=luisteran5296@gmail.com&su=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    // Try to open Gmail in a new tab immediately
    try {
      window.open(gmailUrl, "_blank", "noopener,noreferrer");
    } catch {
      // Fallback silently handled by the rendered success actions
    }
  };

  const handleCopyMessage = () => {
    if (!submittedData) return;
    const body = getMailBody(submittedData.name, submittedData.email, submittedData.message);
    navigator.clipboard.writeText(body).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleReset = () => {
    setSubmittedData(null);
    setErrors({});
  };

  return (
    <section id="contact" className="max-w-7xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8 }}
        className="glass-panel p-8 md:p-14 rounded-[3rem] border border-foreground/10 relative overflow-hidden shadow-2xl"
      >
        {/* Background Gradients */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Contact Info (Left Column) */}
          <div className="flex-1 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                {t.nav.contact}
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
                {t.contact.titlePre} <span className="text-gradient-primary">{t.contact.titleHighlight}</span>
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                {t.contact.description}
              </p>
            </div>

            <div className="space-y-3.5">
              {/* Email Direct */}
              <a 
                href="mailto:luisteran5296@gmail.com" 
                className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors cursor-pointer group p-3 rounded-2xl hover:bg-foreground/5 border border-transparent hover:border-foreground/10"
              >
                <div className="w-12 h-12 rounded-2xl glass-panel border border-foreground/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-sm">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider block">Email Directo</span>
                  <span className="font-semibold text-foreground text-sm sm:text-base">luisteran5296@gmail.com</span>
                </div>
              </a>

              {/* LinkedIn Profile */}
              <a 
                href={t.socials.linkedin} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors cursor-pointer group p-3 rounded-2xl hover:bg-foreground/5 border border-transparent hover:border-foreground/10"
              >
                <div className="w-12 h-12 rounded-2xl glass-panel border border-foreground/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-sm">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider block">LinkedIn</span>
                  <span className="font-semibold text-foreground text-sm sm:text-base">in/luis-angel-teran-miranda</span>
                </div>
              </a>

              {/* GitHub Profile */}
              <a 
                href={t.socials.github} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors cursor-pointer group p-3 rounded-2xl hover:bg-foreground/5 border border-transparent hover:border-foreground/10"
              >
                <div className="w-12 h-12 rounded-2xl glass-panel border border-foreground/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-sm">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider block">GitHub</span>
                  <span className="font-semibold text-foreground text-sm sm:text-base">github.com/luisteran5296</span>
                </div>
              </a>

              {/* WhatsApp Direct */}
              <a 
                href="https://wa.me/525573652856?text=Hola%20Luis,%20te%20contacto%20desde%20tu%20portafolio%20web%20para%20conversar%20sobre%20una%20oportunidad%20laboral." 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors cursor-pointer group p-3 rounded-2xl hover:bg-foreground/5 border border-transparent hover:border-foreground/10"
              >
                <div className="w-12 h-12 rounded-2xl glass-panel border border-foreground/10 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform shadow-sm">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider block">WhatsApp Directo / Teléfono</span>
                  <span className="font-semibold text-foreground text-sm sm:text-base">+52 55 7365 2856</span>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-4 text-muted-foreground p-3 rounded-2xl">
                <div className="w-12 h-12 rounded-2xl glass-panel border border-foreground/10 flex items-center justify-center text-primary shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider block">Ubicación</span>
                  <span className="font-semibold text-foreground text-sm sm:text-base">{t.contact.locationLabel}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form & Action Dispatcher (Right Column) */}
          <div className="flex-1 glass-panel p-6 sm:p-8 rounded-[2rem] border border-foreground/10 relative shadow-xl flex flex-col justify-center">
            {submittedData ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6 flex flex-col items-center text-center space-y-5"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-2xl font-extrabold text-foreground tracking-tight">¡Propuesta Lista para Enviar!</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm mt-1.5 max-w-md mx-auto">
                    Elige el canal directo que prefieras para enviar tu propuesta a <b>luisteran5296@gmail.com</b>:
                  </p>
                </div>

                {/* Proposal Preview Box */}
                <div className="w-full bg-foreground/5 border border-foreground/10 rounded-2xl p-4 text-left text-xs text-foreground/90 space-y-1.5">
                  <div className="flex justify-between items-center text-[11px] text-muted-foreground border-b border-foreground/10 pb-1.5 mb-1.5">
                    <span className="font-bold uppercase tracking-wider">Resumen de propuesta</span>
                    <span className="font-mono text-primary font-bold">{submittedData.email}</span>
                  </div>
                  <p className="font-semibold text-foreground">De: {submittedData.name}</p>
                  <p className="text-muted-foreground line-clamp-3 italic">"{submittedData.message}"</p>
                </div>

                {/* Primary Action Buttons Grid */}
                <div className="w-full space-y-2.5 pt-1">
                  {/* Option 1: Gmail Web (New Tab with everything prefilled) */}
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=luisteran5296@gmail.com&su=${encodeURIComponent(
                      getMailSubject(submittedData.name)
                    )}&body=${encodeURIComponent(
                      getMailBody(submittedData.name, submittedData.email, submittedData.message)
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold flex items-center justify-center gap-2 shadow-md shadow-red-500/20 hover:shadow-lg transition-all text-xs sm:text-sm cursor-pointer"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Enviar vía Gmail Web</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80 ml-0.5" />
                  </a>

                  {/* Option 2: WhatsApp Web / App */}
                  <a
                    href={`https://wa.me/525573652856?text=${encodeURIComponent(
                      `Hola Luis, te contacto desde tu portafolio web con una propuesta laboral:\n\n*Nombre/Empresa:* ${submittedData.name}\n*Email:* ${submittedData.email}\n*Detalles:* ${submittedData.message}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 hover:shadow-lg transition-all text-xs sm:text-sm cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Enviar vía WhatsApp Directo</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80 ml-0.5" />
                  </a>

                  {/* Option 3: Default Mail Client (Outlook, Apple Mail, etc.) */}
                  <a
                    href={`mailto:luisteran5296@gmail.com?subject=${encodeURIComponent(
                      getMailSubject(submittedData.name)
                    )}&body=${encodeURIComponent(
                      getMailBody(submittedData.name, submittedData.email, submittedData.message)
                    )}`}
                    className="w-full h-11 rounded-xl bg-foreground/10 hover:bg-foreground/15 text-foreground font-semibold flex items-center justify-center gap-2 transition-all text-xs cursor-pointer border border-foreground/10"
                  >
                    <Mail className="w-3.5 h-3.5 text-primary" />
                    <span>Abrir cliente de correo predeterminado (Mailto)</span>
                  </a>

                  {/* Option 4: Copy Full Message */}
                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    className="w-full h-10 rounded-xl bg-transparent hover:bg-foreground/5 text-muted-foreground hover:text-foreground font-medium flex items-center justify-center gap-2 transition-all text-xs cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-500 font-bold">¡Mensaje copiado al portapapeles!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copiar texto de la propuesta</span>
                      </>
                    )}
                  </button>
                </div>

                <Button 
                  onClick={handleReset} 
                  variant="ghost" 
                  size="sm"
                  className="rounded-full text-xs text-muted-foreground hover:text-foreground mt-2"
                >
                  <RotateCcw className="w-3 h-3 mr-1.5" />
                  Editar o redactar otra propuesta
                </Button>
              </motion.div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                {/* Name field */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    {t.contact.form.nameLabel} <span className="text-rose-500">*</span>
                  </label>
                  <Input 
                    type="text" 
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    className={`rounded-xl py-3 px-4 bg-foreground/5 text-foreground focus-visible:ring-primary placeholder:text-muted-foreground/50 transition-colors ${
                      errors.name ? "border-rose-500 focus-visible:ring-rose-500" : "border-foreground/10"
                    }`}
                    placeholder={t.contact.form.namePlaceholder}
                  />
                  {errors.name && (
                    <p className="text-[11px] font-medium text-rose-500 mt-1 pl-1 flex items-center gap-1">
                      <span>•</span> {errors.name}
                    </p>
                  )}
                </div>
                
                {/* Email field */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    {t.contact.form.emailLabel} <span className="text-rose-500">*</span>
                  </label>
                  <Input 
                    type="email" 
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    className={`rounded-xl py-3 px-4 bg-foreground/5 text-foreground focus-visible:ring-primary placeholder:text-muted-foreground/50 transition-colors ${
                      errors.email ? "border-rose-500 focus-visible:ring-rose-500" : "border-foreground/10"
                    }`}
                    placeholder={t.contact.form.emailPlaceholder}
                  />
                  {errors.email && (
                    <p className="text-[11px] font-medium text-rose-500 mt-1 pl-1 flex items-center gap-1">
                      <span>•</span> {errors.email}
                    </p>
                  )}
                </div>
                
                {/* Message field */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    {t.contact.form.messageLabel} <span className="text-rose-500">*</span>
                  </label>
                  <Textarea 
                    rows={4}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                    }}
                    className={`rounded-xl py-3 px-4 bg-foreground/5 text-foreground focus-visible:ring-primary resize-none placeholder:text-muted-foreground/50 min-h-[110px] transition-colors ${
                      errors.message ? "border-rose-500 focus-visible:ring-rose-500" : "border-foreground/10"
                    }`}
                    placeholder={t.contact.form.messagePlaceholder}
                  />
                  {errors.message && (
                    <p className="text-[11px] font-medium text-rose-500 mt-1 pl-1 flex items-center gap-1">
                      <span>•</span> {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <Button 
                  type="submit"
                  size="lg" 
                  className="w-full rounded-xl bg-black hover:bg-neutral-800 text-white font-bold shadow-lg shadow-black/20 hover:shadow-xl mt-3 h-12 cursor-pointer transition-all hover:scale-[1.01] border border-neutral-800 dark:border-neutral-700"
                >
                  <span>{t.contact.form.submitBtn}</span>
                  <Send className="w-4 h-4 ml-2" />
                </Button>
              </form>
            )}
          </div>

        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;

