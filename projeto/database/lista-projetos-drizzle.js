import { db } from '../database/index.js'
import { projetos } from '../database/schema.js'

const resultado = await db
  .select()
  .from(projetos)
  .orderBy(projetos.id)

console.log(resultado)