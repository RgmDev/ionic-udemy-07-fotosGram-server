"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uniqid_1 = __importDefault(require("uniqid"));
class FileSystem {
    constructor() { }
    guardarImagenTemporal(file, userId) {
        return new Promise((resolve, reject) => {
            const path = this.crearCarpetaUsuario(userId);
            const nombreArchivo = this.generarNombreUnico(file.name);
            file.mv(`${path}/${nombreArchivo}`, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve({});
                }
            });
        });
    }
    imagenesDeTempHaciaPost(userId) {
        const pathTemp = path_1.default.resolve(__dirname, '../uploads', userId, 'temp');
        const pathPosts = path_1.default.resolve(__dirname, '../uploads', userId, 'posts');
        if (!fs_1.default.existsSync(pathTemp)) {
            return [];
        }
        if (!fs_1.default.existsSync(pathPosts)) {
            fs_1.default.mkdirSync(pathPosts);
        }
        const imagenesTemp = this.obtenerImagenesEnTemp(userId);
        imagenesTemp.forEach((imagen) => {
            fs_1.default.renameSync(`${pathTemp}/${imagen}`, `${pathPosts}/${imagen}`);
        });
        return imagenesTemp;
    }
    obtenerImagenesEnTemp(userId) {
        const pathTemp = path_1.default.resolve(__dirname, '../uploads', userId, 'temp');
        return fs_1.default.readdirSync(pathTemp) || [];
    }
    generarNombreUnico(nombreOriginal) {
        const nombreArr = nombreOriginal.split('.');
        const extension = nombreArr[nombreArr.length - 1];
        const idUnico = (0, uniqid_1.default)();
        return `${idUnico}.${extension}`;
    }
    crearCarpetaUsuario(userId) {
        const pathUser = path_1.default.resolve(__dirname, '../uploads', userId);
        const pathUserTemp = pathUser + '/temp';
        console.log(pathUser);
        const existe = fs_1.default.existsSync(pathUser);
        if (!existe) {
            fs_1.default.mkdirSync(pathUser);
            fs_1.default.mkdirSync(pathUserTemp);
        }
        return pathUserTemp;
    }
    getFotoUrl(userId, img) {
        const pathFoto = path_1.default.resolve(__dirname, '../uploads', userId, 'posts', img);
        const existe = fs_1.default.existsSync(pathFoto);
        if (!existe) {
            return path_1.default.resolve(__dirname, '../assets/400x250.jpg');
        }
        return pathFoto;
    }
}
exports.default = FileSystem;
