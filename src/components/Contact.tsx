import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "El nombre es requerido").max(100),
  email: z.string().trim().email("Email inválido").max(255),
  message: z.string().trim().min(1, "El mensaje es requerido").max(1000),
});

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      contactSchema.parse(formData);
      toast.success("Mensaje enviado correctamente");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      }
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "info@corbilhuers.com",
      link: "mailto:info@corbilhuers.com"
    },
    {
      icon: Phone,
      title: "Teléfono",
      content: "+34 973 XXX XXX",
    },
    {
      icon: MapPin,
      title: "Ubicación",
      content: "Les, Val d'Aran",
    },
  ];

  return (
    <section id="contacto" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Contacto
          </h2>
          <div className="w-24 h-1 bg-gradient-warm mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            ¿Quieres que actuemos en tu evento? ¿Tienes alguna pregunta? No dudes en contactarnos
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div>
            <Card className="border-border shadow-card">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Nombre
                    </label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Tu nombre"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="tu@email.com"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Mensaje
                    </label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Cuéntanos sobre tu evento o consulta..."
                      rows={5}
                      className="w-full"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Enviar Mensaje
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="border-border hover:shadow-soft transition-all duration-300">
                <CardContent className="p-6 flex items-start">
                  <div className="w-12 h-12 bg-gradient-warm rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-foreground mb-1">{info.title}</h4>
                    <p className="text-muted-foreground">{info.content}</p>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="border-border bg-gradient-warm">
              <CardContent className="p-6">
                <h4 className="text-xl font-bold text-white mb-2">¿Interesado en nuestras actuaciones?</h4>
                <p className="text-white/90">
                  Estamos disponibles para eventos culturales, fiestas patronales, festivales y celebraciones tradicionales.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
