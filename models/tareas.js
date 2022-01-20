const Tarea = require('./tarea');
class Tareas {
    _listado = {}

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        })
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    listadoCompleto() {
        console.log()
        this.listadoArr.map((tarea, i) => {
            const { desc, completadoEn } = tarea;
            const index = `${i + 1}.`.green;
            let estado = '';
            completadoEn ? estado = 'Completado'.green : estado = 'Pendiente'.red
            console.log(`${index} ${desc} :: ${estado}`)
        })
    }

    listarPorEstado(completadas = true) {
        console.log()
        let tareas = []
        if (completadas) {
            tareas = this.listadoArr.filter(tarea => tarea.completadoEn)
        } else {
            tareas = this.listadoArr.filter(tarea => !tarea.completadoEn)
        }
        tareas.map((tarea, i) => {
            const index = `${i + 1}.`.green;
            const { desc } = tarea;
            console.log(`${index} ${desc} :: ${completadas ? tarea.completadoEn.green : 'Pendiente'.red}`)
        })
    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    toggleCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        })

        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }
}

module.exports = Tareas;