// In src/v1/routes/workoutRoutes.js
const express = require('express');
const workoutController = require('../controllers/workoutControllers');
const apicache = require('apicache');
const router = express.Router();
const cache = apicache.middleware;
/**
 * @openapi
 * /v1/faq:
 *  get:
 *      summary: Get all faq items
 *      tags:
 *        - All FAQ
 *      parameters:
 *        - in: query
 *          name: query
 *          schema:
 *              type: object
 *              description: The mode of a workout
 *              example: {"id":"2","category_id":"3"}
 *      responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/FAQ"
 *
 */

router.get(
    '/',
    workoutController.getAllWorkouts
);
/**
 * @openapi
 * /v1/faq/{faqId}:
 *  get:
 *      summary: Get a faq by ID
 *      parameters:
 *        - in: path
 *          name: faqId
 *          required: true
 *          schema:
 *           type: number
 *           example: 3
 *      tags:
 *       - One single Item
 *      responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/FAQ"
 */
router.get('/:faqId', workoutController.getOneWorkout);
/**
 * @openapi
 * /v1/faq:
 *  post:
 *      summary: Create a new FAQ
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/FAQFORM'
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      type: array
 *                      properties:
 *                         category_id:
 *                           type: integer
 *                           example: 3
 *                         titleRO:
 *                           type: string
 *                           example: În momentul efectuării achitării, spontan s-a deconectat terminalul, ce să fac?
 *                         titleRU:
 *                           type: string
 *                           example: Я оплачивал услугу, и вдруг терминал завис (выключился и т.д.), что мне делать?
 *                         titleEN:
 *                           type: string
 *                           example: I paid for the service, and suddenly the terminal froze (turned off, etc.), what should I do?
 *                         textRO:
 *                           type: string
 *                           example: <p>Dacă ați indicat în mod corect detaliile dvs. și aţi introdus deja bani în terminal, este necesar să contactați <strong>\"Serviciul Suport Clienți”</strong> pentru a fi informat despre statutul achitării, precum şi pentru primirea bonului de plată. În cazul în care nu aţi introdus nici o sumă de bani în terminal, vom fi foarte recunoscători dacă ne veţi comunica despre deconectarea terminalului.</p>\r\n
 *                         textRU:
 *                           type: string
 *                           example: <p>Dacă ați indicat în mod corect detaliile dvs. și aţi introdus deja bani în terminal, este necesar să contactați <strong>\"Serviciul Suport Clienți”</strong> pentru a fi informat despre statutul achitării, precum şi pentru primirea bonului de plată. În cazul în care nu aţi introdus nici o sumă de bani în terminal, vom fi foarte recunoscători dacă ne veţi comunica despre deconectarea terminalului.</p>\r\n
 *                         textEN:
 *                           type: string
 *                           example: <p>Dacă ați indicat în mod corect detaliile dvs. și aţi introdus deja bani în terminal, este necesar să contactați <strong>\"Serviciul Suport Clienți”</strong> pentru a fi informat despre statutul achitării, precum şi pentru primirea bonului de plată. În cazul în care nu aţi introdus nici o sumă de bani în terminal, vom fi foarte recunoscători dacă ne veţi comunica despre deconectarea terminalului.</p>\r\n
 *                         sorder:
 *                           type: number
 *                           example: 3
 *      tags:
 *       - Create new FAQ
 *      responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/FAQFORM"
 */
router.post('/', workoutController.createNewWorkout);
/**
 * @openapi
 * /v1/faq/{faqId}:
 *  patch:
 *      parameters:
 *        - in: path
 *          name: faqId
 *          required: true
 *          schema:
 *           type: number
 *           example: 3
 *      summary: Update an existing FAQ
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/FAQ'
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      properties:
 *                         category_id:
 *                           type: integer
 *                           example: 3
 *                         titleRO:
 *                           type: string
 *                           example: În momentul efectuării achitării, spontan s-a deconectat terminalul, ce să fac?
 *                         titleRU:
 *                           type: string
 *                           example: Я оплачивал услугу, и вдруг терминал завис (выключился и т.д.), что мне делать?
 *                         titleEN:
 *                           type: string
 *                           example: I paid for the service, and suddenly the terminal froze (turned off, etc.), what should I do?
 *                         textRO:
 *                           type: string
 *                           example: <p>Dacă ați indicat în mod corect detaliile dvs. și aţi introdus deja bani în terminal, este necesar să contactați <strong>\"Serviciul Suport Clienți”</strong> pentru a fi informat despre statutul achitării, precum şi pentru primirea bonului de plată. În cazul în care nu aţi introdus nici o sumă de bani în terminal, vom fi foarte recunoscători dacă ne veţi comunica despre deconectarea terminalului.</p>\r\n
 *                         textRU:
 *                           type: string
 *                           example: <p>Dacă ați indicat în mod corect detaliile dvs. și aţi introdus deja bani în terminal, este necesar să contactați <strong>\"Serviciul Suport Clienți”</strong> pentru a fi informat despre statutul achitării, precum şi pentru primirea bonului de plată. În cazul în care nu aţi introdus nici o sumă de bani în terminal, vom fi foarte recunoscători dacă ne veţi comunica despre deconectarea terminalului.</p>\r\n
 *                         textEN:
 *                           type: string
 *                           example: <p>Dacă ați indicat în mod corect detaliile dvs. și aţi introdus deja bani în terminal, este necesar să contactați <strong>\"Serviciul Suport Clienți”</strong> pentru a fi informat despre statutul achitării, precum şi pentru primirea bonului de plată. În cazul în care nu aţi introdus nici o sumă de bani în terminal, vom fi foarte recunoscători dacă ne veţi comunica despre deconectarea terminalului.</p>\r\n
 *                         sorder:
 *                           type: number
 *                           example: 3
 *      tags:
 *       - Update an existing FAQ
 *      responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/FAQFORM"
 */
router.patch(
    '/:faqId',
    workoutController.updateOneWorkout
);

router.delete(
    '/:faqId',
    workoutController.deleteOneWorkout
);

module.exports = router;