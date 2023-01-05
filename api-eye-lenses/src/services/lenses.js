const lenses = (deps) => {
    return {
        all: () => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                
                connection.query('SELECT * FROM lenses', (error, results) => {
                    if (error) {
                        errorHandler(error, 'Falha ao listar lentes', reject)
                        return
                    }

                    resolve({
                        lenses: results
                    })
                })
            })
        },

        allByUserId: (userId) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                
                connection.query('SELECT * FROM lenses WHERE id_user = ? ORDER BY created_at', [userId], (error, results) => {
                    if (error) {
                        errorHandler(error, 'Falha ao listar lentes', reject)
                        return
                    }

                    resolve({
                        lenses: results
                    })
                })
            })
        },

        getById: (lensId) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                
                connection.query('SELECT * FROM lenses WHERE id = ?', [lensId], (error, results) => {
                    if (error) {
                        errorHandler(error, 'Falha ao listar lente', reject)
                        return
                    }

                    resolve({
                        lens: results
                    })
                })
            })
        },

        save: (name, duration, id_user) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                
                connection.query('INSERT INTO lenses (name, duration, id_user) VALUES (?, ?, ?)', [name, duration, id_user], (error, results) => {
                    if (error) {
                        errorHandler(error, `Falha ao salvar lente ${name}`, reject)
                        return
                    }

                    resolve({
                        lens: { name, id: results.insertId }
                    })
                })
            })
        },

        update: (id, name, duration) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                
                connection.query('UPDATE lenses SET name = ?, duration = ? WHERE id = ?', [name, duration, id], (error, results) => {
                    if (error || !results.affectedRows) {
                        errorHandler(error, `Falha ao atualizar lente ${name}`, reject)
                        return
                    }

                    resolve({
                        lens: { name, id },
                        affectedRows: results.affectedRows
                    })
                })
            })
        },

        del: (id) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                
                connection.query('DELETE FROM lenses WHERE id = ?', [id], (error, results) => {
                    if (error || !results.affectedRows) {
                        errorHandler(error, `Falha ao remover lente de id ${id}`, reject)
                        return
                    }

                    resolve({
                        message: `Lente removida com sucesso`,
                        affectedRows: results.affectedRows,
                        id
                    })
                })
            })
        },
    }
}

module.exports = lenses
