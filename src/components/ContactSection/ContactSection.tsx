import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Mail, Phone, CheckCircle2 } from "lucide-react";
import { Input } from "../lightswind/input";
import { Textarea } from "../lightswind/textarea";
import { Button } from "../lightswind/button";
import { useLanguage } from "../../context/LanguageContext";

export const ContactSection = () => {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:luisteran5296@gmail.com?subject=${encodeURIComponent(
      `Contacto desde portafolio - ${name}`
    )}&body=${encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`)}`;
    window.location.href = mailtoUrl;
    setSent(true);
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
          
          {/* Contact Info */}
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

            <div className="space-y-5">
              <a 
                href="mailto:luisteran5296@gmail.com" 
                className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors cursor-pointer group p-3 rounded-2xl hover:bg-foreground/5"
              >
                <div className="w-12 h-12 rounded-2xl glass-panel border border-foreground/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-sm">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider block">Email</span>
                  <span className="font-semibold text-foreground text-sm sm:text-base">luisteran5296@gmail.com</span>
                </div>
              </a>

              <a 
                href="tel:+525573652856" 
                className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors cursor-pointer group p-3 rounded-2xl hover:bg-foreground/5"
              >
                <div className="w-12 h-12 rounded-2xl glass-panel border border-foreground/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-sm">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider block">Teléfono / WhatsApp</span>
                  <span className="font-semibold text-foreground text-sm sm:text-base">+52 55 7365 2856</span>
                </div>
              </a>

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

          {/* Form */}
          <div className="flex-1 glass-panel p-6 sm:p-8 rounded-[2rem] border border-foreground/10 relative shadow-xl">
            {sent ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shadow-lg">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">¡Mensaje Preparado!</h3>
                <p className="text-muted-foreground text-sm max-w-sm">
                  Tu cliente de correo se ha abierto para enviar el mensaje. ¡Responderé a la brevedad!
                </p>
                <Button 
                  onClick={() => setSent(false)} 
                  variant="outline" 
                  className="rounded-full mt-4"
                >
                  Enviar otro mensaje
                </Button>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    {t.contact.form.nameLabel}
                  </label>
                  <Input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="rounded-xl py-3 px-4 bg-foreground/5 border-foreground/10 text-foreground focus-visible:ring-primary placeholder:text-muted-foreground/50"
                    placeholder={t.contact.form.namePlaceholder}
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    {t.contact.form.emailLabel}
                  </label>
                  <Input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-xl py-3 px-4 bg-foreground/5 border-foreground/10 text-foreground focus-visible:ring-primary placeholder:text-muted-foreground/50"
                    placeholder={t.contact.form.emailPlaceholder}
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    {t.contact.form.messageLabel}
                  </label>
                  <Textarea 
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="rounded-xl py-3 px-4 bg-foreground/5 border-foreground/10 text-foreground focus-visible:ring-primary resize-none placeholder:text-muted-foreground/50 min-h-[110px]"
                    placeholder={t.contact.form.messagePlaceholder}
                  />
                </div>

                <Button 
                  type="submit"
                  size="lg" 
                  className="w-full rounded-xl bg-primary text-primary-foreground font-bold shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] mt-3 h-12 cursor-pointer transition-all hover:scale-[1.01]"
                >
                  {t.contact.form.submitBtn} <Send className="w-4 h-4 ml-2" />
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
