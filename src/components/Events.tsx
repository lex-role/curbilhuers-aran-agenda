import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Clock } from "lucide-react";

interface Event {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

export const Events = () => {
  // En el futuro, estos eventos se cargarán desde archivos markdown
  const events: Event[] = [
    {
      title: "Fiesta Mayor de Les",
      date: "15 de Julio, 2025",
      time: "19:00",
      location: "Plaza del Pueblo, Les",
      description: "Actuación especial durante las fiestas patronales con un repertorio completo de danzas tradicionales aranesas.",
    },
    {
      title: "Festival de Folclore del Pirineo",
      date: "3 de Agosto, 2025",
      time: "18:30",
      location: "Vielha",
      description: "Participación en el festival internacional junto a grupos de toda la región pirenaica.",
    },
    {
      title: "Celebración de Sant Miquèu",
      date: "29 de Septiembre, 2025",
      time: "17:00",
      location: "Iglesia de Les",
      description: "Danzas tradicionales en honor al patrón del valle, una celebración centenaria.",
    },
  ];

  return (
    <section id="eventos" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Próximos Actos
          </h2>
          <div className="w-24 h-1 bg-gradient-warm mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Acompáñanos en nuestras próximas actuaciones y celebraciones
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <Card 
              key={index} 
              className="border-border hover:shadow-card transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">{event.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="w-5 h-5 mr-3 text-primary" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Clock className="w-5 h-5 mr-3 text-primary" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="w-5 h-5 mr-3 text-primary" />
                  <span>{event.location}</span>
                </div>
                <p className="text-muted-foreground pt-2 border-t border-border">
                  {event.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground italic">
            * La agenda se actualiza regularmente con nuevos eventos y actuaciones
          </p>
        </div>
      </div>
    </section>
  );
};
