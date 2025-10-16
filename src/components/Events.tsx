import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Clock } from "lucide-react";
import { useEffect, useState } from "react";

interface Event {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

// Parser simple de markdown con frontmatter para el navegador
const parseMarkdownEvents = (text: string): Event[] => {
  console.log('📄 Contenido completo del archivo:', text);

  // Dividir el contenido por bloques ---
  const blocks = text.split('---').filter(block => block.trim());
  console.log('📦 Bloques encontrados:', blocks.length);

  const events: Event[] = [];

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i].trim();
    if (!block) continue;

    console.log(`\n🔍 Procesando bloque ${i + 1}:`, block);

    const event: Partial<Event> = {};
    const lines = block.split('\n');

    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine.includes(':')) {
        const colonIndex = trimmedLine.indexOf(':');
        const key = trimmedLine.substring(0, colonIndex).trim();
        const value = trimmedLine.substring(colonIndex + 1).trim();

        if (key === 'title') event.title = value;
        else if (key === 'date') event.date = value;
        else if (key === 'time') event.time = value;
        else if (key === 'location') event.location = value;
        else if (key === 'description') event.description = value;
      }
    }

    console.log('🎯 Evento parseado:', event);

    if (event.title) {
      events.push({
        title: event.title || '',
        date: event.date || '',
        time: event.time || '',
        location: event.location || '',
        description: event.description || '',
      });
    }
  }

  console.log('✨ Total eventos parseados:', events.length, events);
  return events;
};

export const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        console.log('🚀 Iniciando carga de eventos...');
        // Construir la URL correcta según el entorno
        const baseUrl = import.meta.env.DEV ? '' : '/curbilhuers-aran-agenda';
        const url = `${baseUrl}/Events.md`;
        console.log('🔗 URL a cargar:', url);
        const response = await fetch(url);
        console.log('📡 Respuesta recibida:', response.status, response.statusText);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text();
        console.log('📄 Texto recibido, longitud:', text.length);

        const parsedEvents = parseMarkdownEvents(text);
        console.log('✅ Eventos parseados:', parsedEvents);

        setEvents(parsedEvents);
      } catch (error) {
        console.error('❌ Error loading events:', error);
        // Fallback a eventos por defecto en caso de error
        setEvents([]);
      } finally {
        setLoading(false);
        console.log('🏁 Carga finalizada');
      }
    };

    loadEvents();
  }, []);

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

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Cargando eventos...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No hay eventos programados en este momento.</p>
          </div>
        ) : (
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
        )}

        <div className="mt-12 text-center">
          <p className="text-muted-foreground italic">
            * La agenda se actualiza regularmente con nuevos eventos y actuaciones
          </p>
        </div>
      </div>
    </section>
  );
};
