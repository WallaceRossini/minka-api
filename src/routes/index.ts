import { Router } from "express";
import { InvoiceController } from "../controllers/InvoiceController";
import { TagController } from "../controllers/TagController";

const routes = Router();

const tag_ctrl = new TagController();
const invoice_ctrl = new InvoiceController();


// ROUTE - TAG
routes.get('/tags',tag_ctrl.index);
routes.get('/tags/:id',tag_ctrl.show);
routes.post('/tags', tag_ctrl.create);
routes.patch('/tags/:id',tag_ctrl.update);
routes.delete('/tags/:id',tag_ctrl.delete);

// ROUTE - INVOICE
routes.get('/invoices',invoice_ctrl.index);
routes.get('/invoices/:id',invoice_ctrl.show);
routes.post('/invoices',invoice_ctrl.create);
routes.patch('/invoices/:id',invoice_ctrl.update);
routes.delete('/invoices/:id',invoice_ctrl.delete);



export { routes }