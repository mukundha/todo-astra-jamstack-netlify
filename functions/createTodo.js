const { getNativeClient } = require("./utils/astraClient");

exports.handler = async (event, context) => {
  
  try{
    client = await getNativeClient();
    const body = JSON.parse(event.body);
    const q = `INSERT INTO sag_todo_jamstack.todo (id,content) VALUES ('${body.id}', '${body.text}');`
    console.log(q)
    const rs = await client.execute(q);
    console.log(JSON.stringify( {id:body.id, content: body.text, completed: true}));
    return {
      statusCode: 200,
      body: JSON.stringify( {id:body.id, content: body.text, completed: true}),
    };
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify(e),
    };
  }
};
