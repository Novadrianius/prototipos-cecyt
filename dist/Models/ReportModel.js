"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reportSchema = new mongoose_1.Schema({
    titulo: { type: String, required: true, trim: true },
    alumno: { type: String, required: true },
    grupo: { type: String, required: true },
});
const Report = (0, mongoose_1.model)('Reporte', reportSchema);
exports.default = Report;
//# sourceMappingURL=ReportModel.js.map