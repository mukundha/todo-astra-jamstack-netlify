const { getNativeClient } = require("./utils/astraClient");

exports.handler = async (event, context) => {
  
  const body = JSON.parse(event.body);

  try {
    client = await getNativeClient();
    const body = JSON.parse(event.body);
    const q = `INSERT INTO todo (id,content, completed) VALUES ('${body.id}', '${body.text}', '${body.completed}');`
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
