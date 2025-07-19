وثيقة مشروع ERP MVP

1. نظرة عامة على المشروع
   هدف المشروع: بناء نظام ERP بسيط يمكن من خلاله إدارة العملاء، المنتجات، والمشتريات.

التقنيات المستخدمة:

Frontend: React.js

Template: taildmintemplate

Backend: Node.js + NestJS

ORM: TypeORM

قاعدة البيانات: Postgre

مدة التسليم: 10 أيام

الفريق: 5 أشخاص

2. هيكلية المشروع
   2.1 المشروع مقسم إلى قسمين رئيسيين:
   frontend/ → واجهة المستخدم (React)

backend/ → API و المنطق الخاص بالخادم (Node.js + NestJS)

database/ → ملف أو سكريبت إعداد قاعدة البيانات (مثل SQL dump)

3. هيكلية مجلدات المشروع
   نسخ
   تحرير
   erp-mvp/
   │
   ├── backend/
   │ ├── src/
   │ │ ├── clients/
   │ │ │ ├── clients.controller.ts
   │ │ │ ├── clients.service.ts
   │ │ │ ├── clients.module.ts
   │ │ │ └── client.entity.ts
   │ │ ├── products/
   │ │ │ ├── products.controller.ts
   │ │ │ ├── products.service.ts
   │ │ │ ├── products.module.ts
   │ │ │ └── product.entity.ts
   │ │ ├── invoices/
   │ │ │ ├── invoices.controller.ts
   │ │ │ ├── invoices.service.ts
   │ │ │ ├── invoices.module.ts
   │ │ │ └── invoice.entity.ts
   │ │ ├── app.module.ts
   │ │ └── main.ts
   │ ├── ormconfig.js # إعداد الاتصال بقاعدة البيانات (TypeORM)
   │ ├── package.json
   │ └── tsconfig.json
   │
   ├── frontend/
   │ ├── public/
   │ │ ├── assets/
   │ │ │ ├── images/
   │ │ │ │ ├── logo.png
   │ │ │ │ ├── background.jpg
   │ │ │ │ └── ... # صور أخرى
   │ │ │ └── fonts/
   │ │ │ ├── Roboto-Regular.ttf
   │ │ │ ├── OpenSans-Bold.ttf
   │ │ │ └── ... # خطوط أخرى
   │ │ └── index.html
   │ ├── src/
   │ │ ├── components/
   │ │ │ ├── ClientList.jsx
   │ │ │ ├── ProductList.jsx
   │ │ │ ├── InvoiceForm.jsx
   │ │ │ └── ...
   │ │ ├── pages/
   │ │ │ ├── Dashboard.jsx
   │ │ │ ├── Clients.jsx
   │ │ │ ├── Products.jsx
   │ │ │ └── Invoices.jsx
   │ │ ├── services/
   │ │ │ └── api.js # ملف التعامل مع ال API
   │ │ ├── App.js
   │ │ ├── index.js
   │ │ └── styles/
   │ │ ├── main.css
   │ │ └── variables.css
   │ └── package.json
   │
   └── database/
   └── erp_schema.sql # سكريبت إنشاء الجداول وعلاقاتها في MySQL
4. تفاصيل مهمة
   4.1 مجلد assets في الـ Frontend
   images/:
   تخزن فيه كل الصور المستخدمة في الواجهة مثل الشعار (logo)، الخلفيات، الأيقونات، إلخ.

fonts/:
لتحميل الخطوط الخاصة بالمشروع (لو أنت تستخدم خطوط مخصصة مش Google Fonts مثلاً).

4.2 ملف API.js في Frontend (خدمة التواصل مع الـ Backend)
js
نسخ
تحرير
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getClients = () => axios.get(`${API_URL}/clients`);
export const addClient = (client) => axios.post(`${API_URL}/clients`, client);

// ونفس الشيء للمنتجات والمشتريات...
4.3 إعداد قاعدة البيانات (مثال في erp_schema.sql)
sql
نسخ
تحرير
CREATE TABLE Clients (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL,
email VARCHAR(100),
phone VARCHAR(20),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Products (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock INT DEFAULT 0,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Invoices (
id INT AUTO_INCREMENT PRIMARY KEY,
client_id INT,
total DECIMAL(10,2),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (client_id) REFERENCES Clients(id)
); 5. نصائح عامة
اجعلوا الكود بسيط ومنظم (استخدموا تقسيم المجلدات اللي فوق)

ركزوا على الـ CRUD الأساسي لكل كيان (عميل، منتج، فاتورة)

لا تنسوا تجربة المشروع باستمرار أثناء التطوير

قسموا المهام بينكم (مثلاً 2 على الواجهة، 2 على الخلفية، 1 للتنسيق والاختبار) 6. تقسيم العمل بين أعضاء الفريق

- كل عضو من أعضاء الفريق الأربعة يعمل على تطوير كل من الواجهة الأمامية (Frontend) والخلفية (Backend)، بحيث يتولى كل شخص جزءًا من مهام العملاء، المنتجات، أو المشتريات في كلا الجانبين.
- يتم توزيع المهام بحيث يشارك الجميع في بناء صفحات React (واجهة المستخدم) وإنشاء REST APIs باستخدام Node.js وNestJS (الخلفية).
- التعاون والتنسيق المستمر بين الأعضاء ضروري لضمان تكامل العمل وسرعة الإنجاز.

مثال للتوزيع:

- عضو 1: إدارة العملاء (Frontend + Backend)
- عضو 2: إدارة المنتجات (Frontend + Backend)
- عضو 3: إدارة المشتريات مبيعات (Frontend + Backend)
- عضو 4: إدارة الموردين والمشتريات (Frontend + Backend)
- authontication and authorization , roles managment
