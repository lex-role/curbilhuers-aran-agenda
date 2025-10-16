import { Card, CardContent } from "@/components/ui/card";
import { Music, Heart, Users } from "lucide-react";
import traditionImage from "@/assets/tradition-detail.jpg";

export const About = () => {
  const values = [
    {
      icon: Music,
      title: "Tradición",
      description: "Mantenemos vivas las danzas tradicionales de la Val d'Aran",
    },
    {
      icon: Heart,
      title: "Pasión",
      description: "Cada actuación refleja nuestro amor por la cultura aranesa",
    },
    {
      icon: Users,
      title: "Comunidad",
      description: "Unidos por el folclore y las tradiciones de nuestro valle",
    },
  ];

  return (
    <section id="sobre-nosotros" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Sobre Nosotros
          </h2>
          <div className="w-24 h-1 bg-gradient-warm mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Curbilhèrs de Les es un grupo de danza tradicional dedicado a preservar y promover 
            el rico patrimonio cultural de la Val d'Aran a través de la danza, la música y las tradiciones ancestrales.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img 
              src={traditionImage} 
              alt="Tradición de danza" 
              className="rounded-lg shadow-card w-full"
            />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Nuestra Historia
            </h3>
            <p className="text-muted-foreground mb-4">
              Fundado con el objetivo de mantener vivas las tradiciones dancísticas de la Val d'Aran, 
              nuestro grupo ha recorrido festivales y celebraciones, compartiendo la belleza de nuestras danzas tradicionales.
            </p>
            <p className="text-muted-foreground">
              Cada actuación es un testimonio de nuestra dedicación a preservar el patrimonio cultural aranés, 
              transmitiendo de generación en generación las danzas que han formado parte de nuestra identidad durante siglos.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="border-border hover:shadow-card transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-warm rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-foreground mb-2">{value.title}</h4>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
