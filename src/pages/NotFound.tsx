import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center brand-bg">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-display font-bold text-gradient">404</h1>
        <p className="text-muted-foreground font-body">Página no encontrada</p>
        <a href="/" className="text-primary font-display text-sm uppercase hover:opacity-80" style={{ letterSpacing: "0.2em" }}>
          Volver al inicio
        </a>
      </div>
    </div>
  );
};

export default NotFound;
