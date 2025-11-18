import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Info } from "lucide-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import TecnicoIcon from "../../assets/TecnicoIcon2.png";

ListCardTecnicos.propTypes = {
  data: PropTypes.array.isRequired,
};

export function ListCardTecnicos({ data }) {
  return (
    <div className="grid gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((item, index) => (
        <Card key={index} className="flex flex-col justify-between">
          <CardHeader>
          <img
          src={TecnicoIcon}
          alt="Foto del técnico"
          className="w-24 h-24 mx-auto rounded-full object-cover"
          />
            <CardTitle className="text-lg font-semibold text-primary">
              {item.nombre}
            </CardTitle>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Mail className="h-4 w-4 text-secondary" /> {item.correo}
            </p>
          </CardHeader>

          <CardContent className="flex justify-end pt-2 border-t">
            <Button variant="outline" size="sm" asChild>
              <Link to={`/tecnicos/detail/${item.id}`}>
                <Info className="h-4 w-4 mr-1" /> Ver Detalle
              </Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
