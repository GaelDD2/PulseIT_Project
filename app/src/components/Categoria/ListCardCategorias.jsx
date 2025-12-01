import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Img1 from "../../assets/CategoriaImg1.png";
import Img2 from "../../assets/CategoriaImg2.png";
import Img3 from "../../assets/CategoriaImg3.png";
import Img4 from "../../assets/CategoriaImg4.png";
import Img6 from "../../assets/CategoriaImg6.png";
import Img7 from "../../assets/CategoriaImg7.png";
import Img8 from "../../assets/CategoriaImg8.png";
import { useTranslation } from 'react-i18next';


const categoriaImages = {
    1: Img2,
    2: Img1,
    3: Img3,
    4: Img4,
    6: Img6,
    7: Img7,
    8: Img8,
  };
  
ListCardCategorias.propTypes = {
  data: PropTypes.array.isRequired,
};

export function ListCardCategorias({ data }) {
  const { t } = useTranslation(); // <- NUEVO HOOK

  return (
    <div className="grid gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((item) => (
        <Card
          key={item.id}
          className="relative flex flex-col justify-between overflow-hidden border border-primary/30
                     bg-[#080b14]/80 text-primary-foreground shadow-lg hover:shadow-xl
                     transition-all duration-300 hover:scale-[1.02] group"
        >
          {/* Header con nombre */}
          <CardHeader className="text-center py-4">
            <CardTitle className="text-xl font-bold text-primary">
              {item.nombre}
            </CardTitle>
          </CardHeader>

          {/* Imagen según ID */}
          <div className="flex justify-center">
            <img
              src={categoriaImages[item.id] || Img1}
              alt={t('categories.imageAlt', { name: item.nombre })} 
              className="w-24 h-24 object-contain transition-transform duration-300 group-hover:scale-110"
            />
          </div>

          {/* Contenido visible / hover */}
          <CardContent
            className="flex flex-col items-center justify-center py-6 px-4 text-center
                       transition-all duration-300 group-hover:bg-[#26acf4]/10"
          >
            {/* Descripción oculta hasta hover */}
            <p className="text-sm text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {item.descripcion}
            </p>
          </CardContent>

          {/* Botón inferior */}
          <div className="flex justify-center border-t border-primary/30 py-3">
            <Button
              variant="outline"
              className="flex items-center gap-2 rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              asChild
            >
              <Link to={`/categorias/detail/${item.id}`}>
                <Info className="h-4 w-4" />
                {t('common.moreInfo')} {/* <- TRADUCIDO */}
              </Link>
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}