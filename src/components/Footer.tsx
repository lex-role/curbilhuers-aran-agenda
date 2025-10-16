export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">Curbilhèrs de Les</h3>
          <p className="text-background/80 mb-4">
            Preservando las tradiciones de la Val d'Aran
          </p>
          <div className="border-t border-background/20 pt-4">
            <p className="text-sm text-background/60">
              © {new Date().getFullYear()} Curbilhèrs de Les. Todos los derechos reservados.
            </p>
            <p className="text-sm text-background/60">
              Made with ❤️ by Lex Role
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
