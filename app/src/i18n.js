// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Traducciones en español
const translationES = {
  common: {
    welcome: "Bienvenido a PulseIT",
    loading: "Cargando...",
    save: "Guardar",
    cancel: "Cancelar",
    delete: "Eliminar",
    edit: "Editar",
    view: "Ver",
    back: "Regresar",
    details: "Detalle"
  },
  header: {
    title: "PulseIT",
    tickets: "Tickets",
    administration: "Administración",
    assignments: "Asignaciones",
    notifications: "Notificaciones",
    logout: "Cerrar Sesión",
    login: "Iniciar Sesión",
    register: "Registrarse",
    categoriesSLA: "Categorías y SLA",
    assignmentRules: "Reglas de Asignación",
    techinicians: "Lista de Tecnicos",

  },

  home: {
    title: "PulseIT",
    subtitle: "Registra, asigna y controla tickets de soporte técnico con eficiencia.",
    viewTickets: "Ver Tickets",
    feature1: {
      title: "Gestión de Técnicos",
      description: "Asigna técnicos por especialidad y controla su carga de trabajo."
    },
    feature2: {
      title: "Control de Tickets",
      description: "Registra incidentes y da seguimiento a su ciclo de vida completo."
    },
    feature3: {
      title: "Reportes y SLA",
      description: "Visualiza métricas de cumplimiento y rendimiento técnico."
    }
  },
  
  tickets: {
    myTickets: "Mis Tickets",
    createTicket: "Crear Ticket",
    title: "Título",
    description: "Descripción",
    priority: "Prioridad",
    status: "Estado",
    assign: "Asignar",
    resolve: "Resolver",
    close: "Cerrar",
    finish: "Finalizar"
  },
  
};

// Traducciones en inglés
const translationEN = {
  common: {
    welcome: "Welcome to PulseIT",
    loading: "Loading...",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    view: "View",
    back: "Back",
    details: "Details"
  },
  header: {
    title: "PulseIT",
    tickets: "Tickets",
    administration: "Administration",
    assignments: "Assignments",
    notifications: "Notifications",
    logout: "Logout",
    login: "Login",
    register: "Register",
    categoriesSLA: "Categories and SLA",
    assignmentRules: "Assignment Rules",
    techinicians: "Techinicians",
  },

  // Agrega esta sección después de 'header':
home: {
    title: "PulseIT",
    subtitle: "Register, assign and control technical support tickets efficiently.",
    viewTickets: "View Tickets",
    feature1: {
      title: "Technician Management",
      description: "Assign technicians by specialty and control their workload."
    },
    feature2: {
      title: "Ticket Control",
      description: "Register incidents and track their complete life cycle."
    },
    feature3: {
      title: "Reports and SLA",
      description: "View compliance metrics and technical performance."
    }
  },

  // Agrega esta sección después de 'header':

  tickets: {
    myTickets: "My Tickets",
    createTicket: "Create Ticket",
    title: "Title",
    description: "Description",
    priority: "Priority",
    status: "Status",
    assign: "Assign",
    resolve: "Resolve",
    close: "Close",
    finish: "Finish"
  },
  
};

// Configuración de i18n
i18n
  .use(LanguageDetector) // Detectar idioma del navegador
  .use(initReactI18next) // Integrar con React
  .init({
    resources: {
      en: {
        translation: translationEN
      },
      es: {
        translation: translationES
      }
    },
    fallbackLng: 'es', // Español por defecto
    interpolation: {
      escapeValue: false // React ya protege contra XSS
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;