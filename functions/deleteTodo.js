const { getNativeClient } = require("./utils/astraClient");

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  try {
    client = await getNativeClient();
    const body = JSON.parse(event.body);
    const q = `DELETE FROM todo where id='${body.id}';`
    console.log(q)
    const rs = await client.execute(q);
    console.log(JSON.stringify( {id:body.id, content: body.text, completed: true}));
    return {
      statusCode: 200,
      body: JSON.stringify( {id:body.id, content: body.text, completed: true}),
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: 400,
      body: JSON.stringify(e),
    };
  }
};
