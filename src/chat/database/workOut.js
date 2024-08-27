const DB = require('./connect');


/**
 * @openapi
 * components:
 *   schemas:
 *      FAQ:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 2
 *         category_id:
 *           type: integer
 *           example: 3
 *         titleRO:
 *           type: string
 *           example: În momentul efectuării achitării, spontan s-a deconectat terminalul, ce să fac?
 *         titleRU:
 *           type: string
 *           example: Я оплачивал услугу, и вдруг терминал завис (выключился и т.д.), что мне делать?
 *         titleEN:
 *           type: string
 *           example: I paid for the service, and suddenly the terminal froze (turned off, etc.), what should I do?
 *         textRO:
 *           type: string
 *           example: <p>Dacă ați indicat în mod corect detaliile dvs. și aţi introdus deja bani în terminal, este necesar să contactați <strong>\"Serviciul Suport Clienți”</strong> pentru a fi informat despre statutul achitării, precum şi pentru primirea bonului de plată. În cazul în care nu aţi introdus nici o sumă de bani în terminal, vom fi foarte recunoscători dacă ne veţi comunica despre deconectarea terminalului.</p>\r\n
 *         textRU:
 *           type: string
 *           example: <p>Dacă ați indicat în mod corect detaliile dvs. și aţi introdus deja bani în terminal, este necesar să contactați <strong>\"Serviciul Suport Clienți”</strong> pentru a fi informat despre statutul achitării, precum şi pentru primirea bonului de plată. În cazul în care nu aţi introdus nici o sumă de bani în terminal, vom fi foarte recunoscători dacă ne veţi comunica despre deconectarea terminalului.</p>\r\n
 *         textEN:
 *           type: string
 *           example: <p>Dacă ați indicat în mod corect detaliile dvs. și aţi introdus deja bani în terminal, este necesar să contactați <strong>\"Serviciul Suport Clienți”</strong> pentru a fi informat despre statutul achitării, precum şi pentru primirea bonului de plată. În cazul în care nu aţi introdus nici o sumă de bani în terminal, vom fi foarte recunoscători dacă ne veţi comunica despre deconectarea terminalului.</p>\r\n
 *         sorder:
 *           type: number
 *           example: 3
 *      FAQFORM:
 *       type: object
 *       properties:
 *         category_id:
 *           type: integer
 *           example: 3
 *         titleRO:
 *           type: string
 *           example: În momentul efectuării achitării, spontan s-a deconectat terminalul, ce să fac?
 *         titleRU:
 *           type: string
 *           example: Я оплачивал услугу, и вдруг терминал завис (выключился и т.д.), что мне делать?
 *         titleEN:
 *           type: string
 *           example: I paid for the service, and suddenly the terminal froze (turned off, etc.), what should I do?
 *         textRO:
 *           type: string
 *           example: <p>Dacă ați indicat în mod corect detaliile dvs. și aţi introdus deja bani în terminal, este necesar să contactați <strong>\"Serviciul Suport Clienți”</strong> pentru a fi informat despre statutul achitării, precum şi pentru primirea bonului de plată. În cazul în care nu aţi introdus nici o sumă de bani în terminal, vom fi foarte recunoscători dacă ne veţi comunica despre deconectarea terminalului.</p>\r\n
 *         textRU:
 *           type: string
 *           example: <p>Dacă ați indicat în mod corect detaliile dvs. și aţi introdus deja bani în terminal, este necesar să contactați <strong>\"Serviciul Suport Clienți”</strong> pentru a fi informat despre statutul achitării, precum şi pentru primirea bonului de plată. În cazul în care nu aţi introdus nici o sumă de bani în terminal, vom fi foarte recunoscători dacă ne veţi comunica despre deconectarea terminalului.</p>\r\n
 *         textEN:
 *           type: string
 *           example: <p>Dacă ați indicat în mod corect detaliile dvs. și aţi introdus deja bani în terminal, este necesar să contactați <strong>\"Serviciul Suport Clienți”</strong> pentru a fi informat despre statutul achitării, precum şi pentru primirea bonului de plată. În cazul în care nu aţi introdus nici o sumă de bani în terminal, vom fi foarte recunoscători dacă ne veţi comunica despre deconectarea terminalului.</p>\r\n
 *         sorder:
 *           type: number
 *           example: 3
 */
const getAllWorkouts = (search,result) => {
    try {
        var query = [];
        var data = [];
        var int = 0;

       if(search!==null){
           if(search.mode === undefined) {
               for (var i in search) {
                   query[int] = i + " LIKE " + "?";
                   data[int] = "%"+search[i]+"%";
                   int++;
               }
           } else {
               qq = unescape(search.mode).split('&');
               console.log(qq)
               for (var i in qq) {
                   q = qq[i].split('=');
                   query[int] = qq[0] + " LIKE ?";
                   data[int] = "%"+qq[1]+"%";
                   int++;
               }

           }
           query = "where " + query.join(' AND ')
       } else {
           query = '';
       }
        query = "SELECT *," +
            "(select titleRO from faq_categories where id=faq.category_id) as category " +
            "FROM faq " + query +
            " order by sorder ASC";
       console.log(query);
        DB.query(query,data,
                function (err,results) {
                    if(err!==null)  result.send({ status: 'error', data: err });
                    else {
                        if(results === '') results = "Not found";
                        return result.send({ status: 'OK', data: results });
                    }
                }
            )


    } catch (error) {
        throw { status: 500, message: error };
    }
};

const getOneWorkout = (workoutId,result) => {
    try {
        DB.execute("SELECT *," +
            "(select titleRO from faq_categories where id=faq.category_id) as category" +
            " FROM faq where id = " + workoutId + " order by sorder ASC",
            function (err,results) {

                if(err!==null)  result.send({ status: 'error', data: err });
                else return result.send({ status: 'OK', data: results });

            }
        )


    } catch (error) {
        throw { status: 500, message: error };
    }
};

const createNewWorkout = (newFaq,result) => {
    const  data  = newFaq.body;
    var query = 'insert into faq (';
    var fields = [];
    var datas = [];
    var it = 0;
    for(var i in data){
        var item = data[i];
        fields[it] = i;
        datas[it] = item;
        it++;
    }
    query += fields.join(",") + ") VALUES ('"+ datas.join("','") + "')";
    try {
        DB.execute(query,
            function (err,results) {

                if(err!==null)  result.send({ status: 'error', data: err });
                else return result.send({ status: 'OK', data: query });

            }
        )


    } catch (error) {
        throw { status: 500, message: error };
    }
};

const updateOneWorkout = (faqId, changes,result) => {
    var query = 'UPDATE faq SET ';
    delete(changes.id);
    delete(changes.category);
    var datas = [];
    var it = 0;
    for(var i in changes){
        var item = changes[i];
        datas[it] = i + "='" +item + "'";
        it++;
    }
    query +=  datas.join(',') + " where id=" + faqId;
    try {
        DB.execute(query,
            function (err,results) {

                if(err!==null)  result.send({ status: 'error', data: err });
                else return result.send({ status: 'OK', data: query });

            }
        )


    } catch (error) {
        throw { status: 500, message: error };
    }

};

const deleteOneWorkout = (workoutId) => {
    const indexForDeletion = DB.workouts.findIndex(
        (workout) => workout.id === workoutId
    );
    if (indexForDeletion === -1) {
        return;
    }
    DB.workouts.splice(indexForDeletion, 1);
    saveToDatabase(DB);
};
//DB.end();
module.exports = {
    getAllWorkouts,
    createNewWorkout,
    getOneWorkout,
    updateOneWorkout,
    deleteOneWorkout,
};