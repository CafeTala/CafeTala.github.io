

## **Database Tables**

### **1. Users**
- **Fields:**
  - `id`: UUID, Primary Key
  - `phone`: String
  - `preferences`: JSON (favoriteCurrencies, primaryCurrency)
  - `createdAt`: DateTime
  - `updatedAt`: DateTime

### **2. Stores**
- **Fields:**
  - `id`: UUID, Primary Key
  - `name`: String
  - `type`: String (physical/virtual)
  - `image`: String
  - `location`: JSON (latitude, longitude)
  - `supportedCurrencies`: JSON (array)
  - `contact`: JSON (phone, email, socialLinks)
  - `createdAt`: DateTime
  - `updatedAt`: DateTime

### **3. Products**
- **Fields:**
  - `id`: UUID, Primary Key
  - `name`: String
  - `description`: Text
  - `price`: JSON (gold, fiat)
  - `image`: String
  - `storeId`: UUID (foreign key to Stores)
  - `createdAt`: DateTime
  - `updatedAt`: DateTime

### **4. Currencies**
- **Fields:**
  - `id`: UUID, Primary Key
  - `name`: String
  - `symbol`: String
  - `type`: String (digital/fiat)
  - `currentRate`: Float
  - `createdAt`: DateTime
  - `updatedAt`: DateTime