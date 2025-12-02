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
    details: "Detalle",
    moreInfo: "Más info",
    response: "resp",  
    resolution: "res", 
    errorLoading: "Error al cargar",
    date: "Fecha",
    hours: "hrs",
    errorLoadingDetail: "Error al cargar detalle",
    select: "Seleccionar",
    category: "Categoría",
    errorLoadingData: "Error cargando datos"
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
  
  categories: {
    create: "Crear Categoría",
    name: "Nombre",
    description: "Descripción",
    sla: "SLA",
    tags: "Etiquetas",
    specialties: "Especialidades",
    imageAlt: "Imagen de {{name}}",
    categoryTittle: "Categorias",

    placeholders: {
        name: "Nombre de la categoría",
        description: "Descripción breve",
        selectSLA: "Seleccione un SLA",
        selectTags: "Seleccione etiquetas",
        selectSpecialties: "Seleccione especialidades"
    },
    validation: {
        minOneTag: "Debe seleccionar al menos una etiqueta",
        minOneSpecialty: "Debe seleccionar al menos una especialidad"

    },
    errors: {
        loadData: "Error cargando datos iniciales",
        create: "Error al crear categoría",
        update: "Error al actualizar categoría"
    },
    success: {
        created: "Categoría creada #{{id}} - {{name}}",
        updated: "Categoría actualizada #{{id}} - {{name}}"
    },
    update: "Actualizar Categoría",
   
},
login: {
  title: "Iniciar Sesión",
  email: "Correo electrónico",
  emailPlaceholder: "ejemplo@correo.com",
  password: "Contraseña",
  passwordPlaceholder: "********",
  submit: "Ingresar",
  logoAlt: "Logo PulseIT",
  errors: {
      invalidCredentials: "Correo o contraseña incorrectos.",
      serverError: "Error al conectar con el servidor."
  }
},
notifications: {
  title: "Notificaciones",
  empty: "No tienes notificaciones.",
  new: "Nuevo",
  markAsRead: "Marcar como leído",
  markAllAsRead: "Marcar todas como leídas",
  delete: "Eliminar",
  deleteAll: "Eliminar todas",
  ticketCreated:"Ticket Creado"

},
assignments: {
  dashboard: "Tablero de Asignaciones",
  subtitle: "Visualiza los tickets asignados organizados por estado",
  noAssignments: "No hay asignaciones",
  noTicketsAssigned: "No tienes tickets asignados actualmente.",
  noTickets: "Sin tickets",
  slaRemaining: "SLA restante",
  errors: {
      noUserInfo: "No se encontró información de usuario o rol"
  },
  selectTechnicianFor: "Seleccionar Técnico para",
    noTechniciansAvailable: "No hay técnicos disponibles",
    slaResponse: "SLA Respuesta",
    slaResolution: "SLA Resolución"
},
tickets: {
  status: {
      open: "Abierto",
      inProcess: "En Proceso",
      closed: "Cerrado",
      pending: "Pendiente",
      resolved: "Resuelto"
  },
  myTickets: "Mis tickets",
  createTicket: "Crear Ticket",
  priority: {
    label: "Prioridad",
    normal: "Normal",
    high: "Alta",
    urgent: "Urgente"
},
    title: "Título",
    description: "Descripción",
    requestingUser: "Usuario Solicitante",
    tag: "Etiqueta",
    category: "Categoría",
    evidence: "Evidencias",
    placeholders: {
        title: "Ingrese el título",
        description: "Descripción breve",
        selectTag: "Seleccione una etiqueta",
        selectPriority: "Seleccione la prioridad"
    },
    noCategory: "Sin categoría",
    errorLoadingCategory: "Error al cargar",
    selectTagFirst: "Seleccione una etiqueta",
    evidenceInstructions: "Haz clic o selecciona una o varias imágenes (jpg, png, 5MB máx.)",
    success: {
      created: "Ticket creado #{{id}} - {{title}}"
  },
  errors: {
      create: "Error al crear ticket"
  }

},
technicians: {
  create: "Crear Técnico",
  name: "Nombre",
  email: "Correo",
  availability: "Disponibilidad",
  specialties: "Especialidades",
  update: "Actualizar Técnico",
  password:"Contraseña",

  placeholders: {
      name: "Ingrese el nombre",
      email: "ejemplo@gmail.com",
      selectAvailability: "Seleccione la disponibilidad",
      selectSpecialties: "Seleccione especialidades",
      password: "Dejar vacío para mantener la actual",
  },
  availabilityOptions: {
      available: "Disponible",
      busy: "Ocupado",
      offline: "Desconectado",
      vacation: "Vacaciones"
  },
  success: {
      created: "Técnico creado #{{id}} - {{name}}",
      updated: "Técnico actualizado #{{id}} - {{name}}"
  },
  errors: {
      create: "Error al crear técnico",
      update: "Error al actualizar técnico",
  },
  currentLoad: "Carga Actual",
  listName:"Lista de Técnicos",
},

validation: {
  
  invalidAvailability: "Seleccione una disponibilidad válida",
  password: {
    min: "La contraseña debe tener al menos 8 caracteres",
    uppercase: "Debe contener al menos una letra mayúscula",
    lowercase: "Debe contener al menos una letra minúscula",
    number: "Debe contener al menos un número",
    special: "Debe contener al menos un carácter especial",
    max: "La contraseña no puede exceder los 50 caracteres"
}
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
    details: "Details",
    moreInfo: "More info",
    response: "resp",  
    resolution: "res", 
    
    errorLoading: "Error loading",
    date: "Date",
    hours: "hrs",
    errorLoadingDetail: "Error loading detail",
    select: "Select",
    category: "Category",
    errorLoadingData: "Error loading data",
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

  
categories: {
  create: "Create Category",
  name: "Name",
  description: "Description",
  sla: "SLA",
  tags: "Tags",
  specialties: "Specialties",
  categoryTittle: "Categories",

  placeholders: {
      name: "Category name",
      description: "Brief description",
      selectSLA: "Select an SLA",
      selectTags: "Select tags",
      selectSpecialties: "Select specialties"
  },
  validation: {
      minOneTag: "Must select at least one tag",
      minOneSpecialty: "Must select at least one specialty",
      password: {
        min: "Password must be at least 8 characters",
        uppercase: "Must contain at least one uppercase letter",
        lowercase: "Must contain at least one lowercase letter",
        number: "Must contain at least one number",
        special: "Must contain at least one special character",
        max: "Password cannot exceed 50 characters"
    }
      
  },
  errors: {
      loadData: "Error loading initial data",
      create: "Error creating category",
      update: "Error updating category",
  },
  success: {
      created: "Category created #{{id}} - {{name}}",
      updated: "Category updated #{{id}} - {{name}}"
  },
  update: "Update Category",
 
},

login: {
  title: "Login",
  email: "Email",
  emailPlaceholder: "example@email.com",
  password: "Password",
  passwordPlaceholder: "********",
  submit: "Sign In",
  logoAlt: "PulseIT Logo",
  errors: {
      invalidCredentials: "Incorrect email or password.",
      serverError: "Error connecting to server."
  }
},
notifications: {
  title: "Notifications",
  empty: "You have no notifications.",
  new: "New",
  markAsRead: "Mark as read",
  markAllAsRead: "Mark all as read",
  delete: "Delete",
  deleteAll: "Delete all",
  ticketCreated:"Ticket Created"
},
assignments: {
  dashboard: "Assignments Dashboard",
  subtitle: "View assigned tickets organized by status",
  noAssignments: "No assignments",
  noTicketsAssigned: "You have no tickets assigned at the moment.",
  noTickets: "No tickets",
  slaRemaining: "SLA remaining",
  errors: {
      noUserInfo: "No user or role information found"
  },
  selectTechnicianFor: "Select Technician for",
    noTechniciansAvailable: "No technicians available",
    slaResponse: "SLA Response",
    slaResolution: "SLA Resolution"
},
tickets: {
  status: {
      open: "Open",
      inProcess: "In Process",
      closed: "Closed",
      pending: "Pending",
      resolved: "Resolved"
  },
  myTickets: "My tickets",
  createTicket: "Create Ticket",
  priority: {
    label: "Priority",
    normal: "Normal",
    high: "High",
    urgent: "Urgent"
} ,
    title: "Title",
    description: "Description",
    requestingUser: "Requesting User",
    tag: "Tag",
    category: "Category",
    evidence: "Evidence",
    placeholders: {
        title: "Enter title",
        description: "Brief description",
        selectTag: "Select a tag",
        selectPriority: "Select priority"
    },
    noCategory: "No category",
    errorLoadingCategory: "Error loading",
    selectTagFirst: "Select a tag first",
    evidenceInstructions: "Click or select one or multiple images (jpg, png, 5MB max.)",
    success: {
        created: "Ticket created #{{id}} - {{title}}"
    },
    errors: {
        create: "Error creating ticket"
    }
},
validation: {
  
  invalidAvailability: "Select a valid availability"},
  
technicians: {
  create: "Create Technician",
  name: "Name",
  email: "Email",
  availability: "Availability",
  specialties: "Specialties",
  update: "Update Technician",
  password: "Password",
  placeholders: {
      name: "Enter name",
      email: "example@gmail.com",
      selectAvailability: "Select availability",
      selectSpecialties: "Select specialties",
      password: "Leave empty to keep current",  
  },
  availabilityOptions: {
      available: "Available",
      busy: "Busy",
      offline: "Offline",
      vacation: "Vacation"
  },
  success: {
      created: "Technician created #{{id}} - {{name}}",
      password: "Leave empty to keep current",
  },
  errors: {
      create: "Error creating technician",
      update: "Error updating technician"
  },
  currentLoad: "Current Load",
  listName:"Technicians",
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