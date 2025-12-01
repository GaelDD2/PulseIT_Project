// LanguageSwitcher.jsx - USANDO MENUBAR (que ya tienes)
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from "@/components/ui/menubar";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <Menubar className="bg-transparent border-none shadow-none">
      <MenubarMenu>
        <MenubarTrigger className="text-white font-medium flex items-center gap-1 hover:text-secondary transition cursor-pointer p-2 hover:bg-white/20 rounded-lg">
          <Globe className="h-5 w-5" />
          <span className="hidden sm:inline">{currentLanguage.flag}</span>
        </MenubarTrigger>
        <MenubarContent className="bg-white border-white/10">
          {languages.map((lang) => (
            <MenubarItem
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`flex items-center gap-2 cursor-pointer px-3 py-2 ${
                i18n.language === lang.code ? 'bg-primary/10 text-primary' : ''
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.name}</span>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}