const express = require('express')
const NodeCache = require('node-cache')
const { createClient } = require('@supabase/supabase-js')

const dotenv = require('dotenv')
dotenv.config()

const supabase = createClient('https://cepgucdhfkhsqzkmqnev.supabase.co', process.env.SUPABASE_KEY)

const router = express.Router()

const cache = new NodeCache({ stdTTL: 60 * 60 * 24 })
const checkCache = (req, res, next) => {
  try {
    const { id } = req.params
    if (cache.has(id)) {
      console.log('cache')
      return res.status(200).json(cache.get(id))
    }
    return next()
  } catch (error) {
    throw new Error(error)
  }
}

/**
 * @swagger
 * components:
 *  schemas:
 *    Athletes:
 *      type: array
 *      items:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *          created_at:
 *            type: date
 *          name:
 *            type: string
 *          email:
 *            type: string
 */

/**
 * @swagger
 * /api/athlete:
 *  get:
 *    summaty: return list of athletes
 *    responses:
 *      200:
 *        description: list of athletes
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              $ref: '#/components/schemas/Athletes'
 */

router.get('/athlete', checkCache, async (req, res) => {
  const { data: athletes, error } = await supabase
    .from('athlete')
    .select('*')
  if (error) {
    return res.status(500).json(error)
  }

  return res.status(200).json(athletes)
})

router.post('/athlete/new', checkCache, async (req, res) => {
  const { email, name } = req.body
  const { data, error } = await supabase
    .from('athlete')
    .insert([
      { email, name }
    ])

  if (error) {
    return res.status(500).json(error)
  }

  return res.status(200).json(data)
})

module.exports = router
