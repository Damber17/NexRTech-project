export const initialProducts = [
  ['Fresh Milk (500ml)','FG-DAI-001','Dairy',2.60,148,'Published','https://images.unsplash.com/photo-1550583724-b2692b85b150?w=100'],
  ['Organic Bananas (Bunch)','FG-PRO-002','Produce',3.50,64,'Published','https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=100'],
  ['Sourdough','FG-BAK-003','Bakery',6,8,'Published','https://images.unsplash.com/photo-1585478259715-876acc5be8eb?w=100'],
  ['Grade-A Eggs (12pcs)','FG-DAI-004','Dairy',5.80,96,'Published','https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=100'],
  ['Extra Virgin Olive Oil (500ml)','FG-PAN-005','Pantry',14,36,'Draft','https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=100'],
  ['Rolled Oats (1kg)','FG-PAN-006','Pantry',4.50,82,'Published','https://images.unsplash.com/photo-1517093157656-b9eccef91cb1?w=100'],
  ['Wildflower Honey (250g)','FG-PAN-007','Pantry',8,0,'Published','https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=100'],
  ['Greek Yogurt (400g)','FG-DAI-008','Dairy',4.20,42,'Published','https://images.unsplash.com/photo-1488477181946-6428a0291777?w=100'],
  ['Avocados (2 pack)','FG-PRO-009','Produce',4.80,6,'Published','https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=100'],
  ['Almond Butter (200g)','FG-PAN-010','Pantry',9.50,24,'Archived','https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=100']
].map(([name,sku,category,price,stock_qty,status,product_image],i)=>({id:String(i+1),name,sku,category,price,stock_qty,status,product_image,description:'Online store · POS · Marketplace'}));
export function getProducts(){try{return JSON.parse(localStorage.getItem('merchant_products_figma'))||initialProducts;}catch{return initialProducts;}}
export function setProducts(items){localStorage.setItem('merchant_products_figma',JSON.stringify(items));}
export function downloadCsv(items){const rows=[['Name','SKU','Category','Price','Quantity','Status'],...items.map(p=>[p.name,p.sku,p.category,p.price,p.stock_qty,p.status])];const csv=rows.map(row=>row.map(v=>'"'+String(v??'').replaceAll('"','""')+'"').join(',')).join('\n');const url=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));const a=document.createElement('a');a.href=url;a.download='products.csv';a.click();URL.revokeObjectURL(url);}
