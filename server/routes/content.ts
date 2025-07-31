import { RequestHandler } from "express";
import { ContentPage, Category, Media, Translation, Menu, ContentTemplate, ContentSettings } from "@shared/types";

// Mock data - في التطبيق الحقيقي سيتم استخدام قاعدة البيانات
let pages: ContentPage[] = [
  {
    id: "1",
    title: "الصفحة الرئيسية",
    slug: "home",
    content: "<h1>مرحباً بكم في موقعنا</h1><p>هذا النص التجريبي للصفحة الرئيسية...</p>",
    excerpt: "الصفحة الرئيسية للموقع",
    status: "published",
    type: "page",
    language: "ar",
    seo: {
      metaTitle: "الصفحة الرئيسية - موقعنا",
      metaDescription: "مرحباً بكم في موقعنا الإلكترون��",
      keywords: ["الرئيسية", "موقع", "أعمال"],
      ogImage: "/images/home-og.jpg"
    },
    author: {
      id: "1",
      name: "المدير"
    },
    categories: [],
    tags: ["رئيسية"],
    featuredImage: "/images/home-banner.jpg",
    publishedAt: "2024-01-15T10:00:00Z",
    createdAt: "2024-01-15T09:00:00Z",
    updatedAt: "2024-01-20T14:30:00Z"
  },
  {
    id: "2",
    title: "من نحن",
    slug: "about",
    content: "<h1>من نحن</h1><p>نحن شركة متخصصة في...</p>",
    excerpt: "تعرف على شركتنا ورؤيتنا",
    status: "published",
    type: "page",
    language: "ar",
    seo: {
      metaTitle: "من نحن - شركتنا",
      metaDescription: "تعرف على شركتنا ورؤيتنا ورسالتنا",
      keywords: ["من نحن", "شركة", "رؤية"],
    },
    author: {
      id: "1",
      name: "المدير"
    },
    categories: [],
    tags: ["شركة", "معلومات"],
    createdAt: "2024-01-10T12:00:00Z",
    updatedAt: "2024-01-18T16:45:00Z"
  }
];

let categories: Category[] = [
  {
    id: "1",
    name: "أخبار",
    slug: "news",
    description: "آخر الأخبار والتحديثات",
    color: "#3B82F6",
    icon: "newspaper",
    count: 5
  },
  {
    id: "2",
    name: "مقالات",
    slug: "articles",
    description: "مقالات تقنية ومفيدة",
    color: "#10B981",
    icon: "book-open",
    count: 12
  }
];

let media: Media[] = [
  {
    id: "1",
    filename: "hero-banner.jpg",
    originalName: "banner.jpg",
    mimeType: "image/jpeg",
    size: 245760,
    url: "/uploads/hero-banner.jpg",
    thumbnailUrl: "/uploads/thumbnails/hero-banner.jpg",
    alt: "صورة البانر الرئيسي",
    caption: "صورة ترحيبية",
    description: "الصورة المستخدمة في الصفحة الرئيسية",
    uploadedBy: {
      id: "1",
      name: "المدير"
    },
    createdAt: "2024-01-15T08:00:00Z"
  }
];

let translations: Translation[] = [
  {
    id: "1",
    key: "welcome_message",
    language: "ar",
    value: "مرحباً بكم في موقعنا",
    category: "general",
    context: "الصفحة الرئيسية",
    createdAt: "2024-01-15T08:00:00Z",
    updatedAt: "2024-01-15T08:00:00Z"
  },
  {
    id: "2",
    key: "welcome_message",
    language: "en",
    value: "Welcome to our website",
    category: "general",
    context: "Homepage",
    createdAt: "2024-01-15T08:00:00Z",
    updatedAt: "2024-01-15T08:00:00Z"
  }
];

let menus: Menu[] = [
  {
    id: "1",
    name: "القائمة الرئيسية",
    location: "header",
    language: "ar",
    isActive: true,
    items: [
      {
        id: "1",
        label: "الرئيسية",
        url: "/",
        type: "page",
        target: "_self",
        order: 1
      },
      {
        id: "2",
        label: "من نحن",
        url: "/about",
        type: "page",
        target: "_self",
        order: 2
      },
      {
        id: "3",
        label: "المنتجات",
        url: "/products",
        type: "category",
        target: "_self",
        order: 3,
        children: [
          {
            id: "4",
            label: "إلكترونيات",
            url: "/products/electronics",
            type: "category",
            target: "_self",
            order: 1,
            parentId: "3"
          }
        ]
      }
    ],
    createdAt: "2024-01-15T08:00:00Z",
    updatedAt: "2024-01-20T14:30:00Z"
  }
];

let templates: ContentTemplate[] = [
  {
    id: "1",
    name: "صفحة عادية",
    description: "قالب أساسي للصفحا�� العادية",
    type: "page",
    content: `<div class="page-content">
      <h1>{{title}}</h1>
      <div class="content">{{content}}</div>
      <div class="meta">
        <span>نشر في: {{publishDate}}</span>
      </div>
    </div>`,
    variables: [
      {
        key: "title",
        label: "العنوان",
        type: "text",
        required: true
      },
      {
        key: "content",
        label: "المحتوى",
        type: "text",
        required: true
      },
      {
        key: "publishDate",
        label: "تاريخ النشر",
        type: "date",
        required: false
      }
    ],
    isDefault: true,
    createdAt: "2024-01-15T08:00:00Z",
    updatedAt: "2024-01-15T08:00:00Z"
  }
];

let contentSettings: ContentSettings = {
  general: {
    siteName: "موقعنا الإلكتروني",
    tagline: "موقع رائع للتسوق الإلكتروني",
    description: "نحن نقدم أفضل المنتجات والخدمات",
    logo: "/images/logo.png",
    favicon: "/images/favicon.ico",
    language: "ar",
    timezone: "Asia/Riyadh"
  },
  seo: {
    defaultMetaTitle: "موقعنا الإلكتروني",
    defaultMetaDescription: "أفضل موقع للتسوق الإ��كتروني",
    defaultKeywords: ["تسوق", "إلكتروني", "منتجات"],
    googleAnalyticsId: "GA-XXXXXXXXX-X",
    facebookPixelId: "1234567890123456"
  },
  social: {
    facebookUrl: "https://facebook.com/oursite",
    twitterUrl: "https://twitter.com/oursite",
    instagramUrl: "https://instagram.com/oursite"
  },
  comments: {
    enabled: true,
    requireApproval: true,
    allowGuests: false,
    notifyOnNewComment: true
  },
  editor: {
    allowHtml: true,
    allowScripts: false,
    uploadMaxSize: 5242880, // 5MB
    allowedFileTypes: ["jpg", "jpeg", "png", "gif", "pdf", "docx"]
  }
};

// Pages CRUD
export const getPages: RequestHandler = (req, res) => {
  const { type, status, language, search } = req.query;
  
  let filteredPages = pages;
  
  if (type) {
    filteredPages = filteredPages.filter(page => page.type === type);
  }
  
  if (status) {
    filteredPages = filteredPages.filter(page => page.status === status);
  }
  
  if (language) {
    filteredPages = filteredPages.filter(page => page.language === language);
  }
  
  if (search) {
    const searchTerm = (search as string).toLowerCase();
    filteredPages = filteredPages.filter(page => 
      page.title.toLowerCase().includes(searchTerm) ||
      page.content.toLowerCase().includes(searchTerm)
    );
  }
  
  res.json(filteredPages);
};

export const getPage: RequestHandler = (req, res) => {
  const page = pages.find(p => p.id === req.params.id);
  if (!page) {
    return res.status(404).json({ error: "الصفحة غير موجودة" });
  }
  res.json(page);
};

export const createPage: RequestHandler = (req, res) => {
  const newPage: ContentPage = {
    ...req.body,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  pages.push(newPage);
  res.status(201).json(newPage);
};

export const updatePage: RequestHandler = (req, res) => {
  const index = pages.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "الصفحة غير موجودة" });
  }
  
  pages[index] = {
    ...pages[index],
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  
  res.json(pages[index]);
};

export const deletePage: RequestHandler = (req, res) => {
  const index = pages.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "الصفحة غير موجودة" });
  }
  
  pages.splice(index, 1);
  res.json({ message: "تم حذف الصفحة بنجاح" });
};

// Categories CRUD
export const getCategories: RequestHandler = (req, res) => {
  res.json(categories);
};

export const createCategory: RequestHandler = (req, res) => {
  const newCategory: Category = {
    ...req.body,
    id: Date.now().toString(),
    count: 0
  };
  
  categories.push(newCategory);
  res.status(201).json(newCategory);
};

export const updateCategory: RequestHandler = (req, res) => {
  const index = categories.findIndex(c => c.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "التصنيف غير موجود" });
  }
  
  categories[index] = { ...categories[index], ...req.body };
  res.json(categories[index]);
};

export const deleteCategory: RequestHandler = (req, res) => {
  const index = categories.findIndex(c => c.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "التصنيف غير موجود" });
  }
  
  categories.splice(index, 1);
  res.json({ message: "تم حذف التصنيف بنجاح" });
};

// Media CRUD
export const getMedia: RequestHandler = (req, res) => {
  res.json(media);
};

export const uploadMedia: RequestHandler = (req, res) => {
  // محاكاة رفع ملف
  const newMedia: Media = {
    id: Date.now().toString(),
    filename: `uploaded_${Date.now()}.jpg`,
    originalName: req.body.originalName || "file.jpg",
    mimeType: "image/jpeg",
    size: 245760,
    url: `/uploads/uploaded_${Date.now()}.jpg`,
    thumbnailUrl: `/uploads/thumbnails/uploaded_${Date.now()}.jpg`,
    alt: req.body.alt || "",
    uploadedBy: {
      id: "1",
      name: "المدير"
    },
    createdAt: new Date().toISOString()
  };
  
  media.push(newMedia);
  res.status(201).json(newMedia);
};

export const deleteMedia: RequestHandler = (req, res) => {
  const index = media.findIndex(m => m.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "الملف غير موجود" });
  }
  
  media.splice(index, 1);
  res.json({ message: "تم حذف الملف بنجاح" });
};

// Translations CRUD
export const getTranslations: RequestHandler = (req, res) => {
  const { language, category } = req.query;
  
  let filteredTranslations = translations;
  
  if (language) {
    filteredTranslations = filteredTranslations.filter(t => t.language === language);
  }
  
  if (category) {
    filteredTranslations = filteredTranslations.filter(t => t.category === category);
  }
  
  res.json(filteredTranslations);
};

export const updateTranslation: RequestHandler = (req, res) => {
  const index = translations.findIndex(t => t.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "الترجمة غير موجودة" });
  }
  
  translations[index] = {
    ...translations[index],
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  
  res.json(translations[index]);
};

// Menus CRUD
export const getMenus: RequestHandler = (req, res) => {
  res.json(menus);
};

export const updateMenu: RequestHandler = (req, res) => {
  const index = menus.findIndex(m => m.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "القائمة غير موجودة" });
  }
  
  menus[index] = {
    ...menus[index],
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  
  res.json(menus[index]);
};

// Templates CRUD
export const getTemplates: RequestHandler = (req, res) => {
  res.json(templates);
};

export const createTemplate: RequestHandler = (req, res) => {
  const newTemplate: ContentTemplate = {
    ...req.body,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  templates.push(newTemplate);
  res.status(201).json(newTemplate);
};

// Content Settings
export const getContentSettings: RequestHandler = (req, res) => {
  res.json(contentSettings);
};

export const updateContentSettings: RequestHandler = (req, res) => {
  contentSettings = { ...contentSettings, ...req.body };
  res.json({ 
    message: "تم تحديث إعدادات المحتوى بنجاح",
    settings: contentSettings 
  });
};
