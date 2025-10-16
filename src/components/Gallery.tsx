import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GalleryImage {
    src: string;
    alt: string;
}

// Parser simple para las imágenes en formato markdown
const parseMarkdownImages = (text: string): GalleryImage[] => {
    // Dividir el contenido por bloques ---
    const blocks = text.split('---').filter(block => block.trim());

    const images: GalleryImage[] = [];
    const baseUrl = import.meta.env.DEV ? '' : '/curbilhuers-aran-agenda';

    for (const block of blocks) {
        const image: Partial<GalleryImage> = {};
        const lines = block.split('\n');

        for (const line of lines) {
            const trimmedLine = line.trim();
            if (trimmedLine.includes(':')) {
                const colonIndex = trimmedLine.indexOf(':');
                const key = trimmedLine.substring(0, colonIndex).trim();
                const value = trimmedLine.substring(colonIndex + 1).trim();

                if (key === 'src') {
                    // Añadir el baseUrl si la ruta empieza con /
                    image.src = value.startsWith('/') ? `${baseUrl}${value}` : value;
                }
                else if (key === 'alt') image.alt = value;
            }
        }

        if (image.src) {
            images.push({
                src: image.src,
                alt: image.alt || 'Imagen de galería',
            });
        }
    }

    return images;
};

export const Gallery = () => {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [showAll, setShowAll] = useState(false);

    // Número de imágenes a mostrar inicialmente (2 filas)
    // En móvil: 2 columnas = 4 imágenes por fila
    // En tablet: 3 columnas = 6 imágenes por fila  
    // En desktop: 4 columnas = 8 imágenes por fila
    const INITIAL_IMAGES = 8;

    useEffect(() => {
        const loadImages = async () => {
            try {
                // Construir la URL correcta según el entorno
                const baseUrl = import.meta.env.DEV ? '' : '/curbilhuers-aran-agenda';
                const url = `${baseUrl}/gallery/images.md`;
                const response = await fetch(url);
                const text = await response.text();
                const parsedImages = parseMarkdownImages(text);
                setImages(parsedImages);
            } catch (error) {
                console.error('Error loading gallery images:', error);
                setImages([]);
            } finally {
                setLoading(false);
            }
        };

        loadImages();
    }, []);

    const visibleImages = showAll ? images : images.slice(0, INITIAL_IMAGES);
    const hasMore = images.length > INITIAL_IMAGES;

    const openImage = (index: number) => {
        setSelectedImage(index);
    };

    const closeImage = () => {
        setSelectedImage(null);
    };

    const nextImage = () => {
        if (selectedImage !== null && selectedImage < images.length - 1) {
            setSelectedImage(selectedImage + 1);
        }
    };

    const prevImage = () => {
        if (selectedImage !== null && selectedImage > 0) {
            setSelectedImage(selectedImage - 1);
        }
    };

    // Manejar teclas de flecha
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedImage === null) return;

            if (e.key === 'ArrowLeft' && selectedImage > 0) {
                setSelectedImage(selectedImage - 1);
            }
            if (e.key === 'ArrowRight' && selectedImage < images.length - 1) {
                setSelectedImage(selectedImage + 1);
            }
            if (e.key === 'Escape') {
                setSelectedImage(null);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImage, images.length]);

    return (
        <section id="galeria" className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                        Galería
                    </h2>
                    <div className="w-24 h-1 bg-gradient-warm mx-auto mb-6"></div>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Momentos capturados de nuestras actuaciones y celebraciones
                    </p>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">Cargando galería...</p>
                    </div>
                ) : images.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">No hay imágenes disponibles en este momento.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {visibleImages.map((image, index) => (
                                <div
                                    key={index}
                                    className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
                                    onClick={() => openImage(index)}
                                >
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                                </div>
                            ))}
                        </div>

                        {hasMore && !showAll && (
                            <div className="mt-8 text-center">
                                <Button
                                    onClick={() => setShowAll(true)}
                                    className="bg-primary hover:bg-primary/90 px-8 py-6 text-lg"
                                >
                                    Ver más fotos ({images.length - INITIAL_IMAGES} restantes)
                                </Button>
                            </div>
                        )}

                        {showAll && (
                            <div className="mt-8 text-center">
                                <Button
                                    onClick={() => {
                                        setShowAll(false);
                                        // Scroll suave a la sección de galería
                                        document.getElementById('galeria')?.scrollIntoView({
                                            behavior: 'smooth',
                                            block: 'start'
                                        });
                                    }}
                                    variant="outline"
                                    className="px-8 py-6 text-lg"
                                >
                                    Ver menos
                                </Button>
                            </div>
                        )}
                    </>
                )}

                {/* Modal de imagen completa */}
                <Dialog open={selectedImage !== null} onOpenChange={closeImage}>
                    <DialogContent className="max-w-7xl w-full p-0 bg-black/95 border-none">
                        {selectedImage !== null && (
                            <div className="relative w-full h-[90vh] flex items-center justify-center">
                                {/* Botón cerrar */}
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
                                    onClick={closeImage}
                                >
                                    <X className="w-6 h-6" />
                                </Button>

                                {/* Botón anterior */}
                                {selectedImage > 0 && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute left-4 z-10 text-white hover:bg-white/20"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            prevImage();
                                        }}
                                    >
                                        <ChevronLeft className="w-8 h-8" />
                                    </Button>
                                )}

                                {/* Imagen */}
                                <img
                                    src={images[selectedImage].src}
                                    alt={images[selectedImage].alt}
                                    className="max-w-full max-h-full object-contain"
                                />

                                {/* Botón siguiente */}
                                {selectedImage < images.length - 1 && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-4 z-10 text-white hover:bg-white/20"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            nextImage();
                                        }}
                                    >
                                        <ChevronRight className="w-8 h-8" />
                                    </Button>
                                )}

                                {/* Contador de imágenes */}
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
                                    {selectedImage + 1} / {images.length}
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </section>
    );
};
