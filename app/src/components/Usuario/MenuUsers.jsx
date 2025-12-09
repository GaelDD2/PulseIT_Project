import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

import UserIcon from "../../assets/UserIcon.png";
import UserCreateIcon from "../../assets/UserCreateIcon.png";

export function MenuUsers() {
  const items = [
    {
      id: 1,
      title: "Ver Usuarios",
      description: "Ver todos los usuarios registrados en el sistema",
      img: UserIcon,
      
      link: "/usuarios",
      buttonLabel: "Ver"
    },
    {
      id: 2,
      title: "Crear Usuario",
      description: "Crear un nuevo usuario cliente para el sistema",
      img: UserCreateIcon,
      
      link: "/users/createUser",
      buttonLabel: "Crear"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {items.map((item) => (
        <Card key={item.id} className="shadow-lg border rounded-2xl overflow-hidden">
          <CardHeader className="flex flex-col items-center text-center">
            <img src={item.img} alt={item.title} className="w-24 h-24 object-contain mb-3" />
            {item.icon}
            <CardTitle className="mt-2">{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </CardHeader>

          <CardContent className="flex justify-center mt-3">
            <Button asChild className="bg-primary text-white hover:bg-primary/90">
              <Link to={item.link}>{item.buttonLabel}</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default MenuUsers;
