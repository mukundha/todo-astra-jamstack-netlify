const {getNativeClient} = require("./utils/astraClient");

exports.handler = async (event, context) => {
  try{
    const client = await getNativeClient();
    
    const rs = await client.execute("SELECT * FROM sag_todo_jamstack.todo");
    console.log(rs);
    t = []; 
    for ( row in rs.rows){
      console.log(row)
      r = rs.rows[row]
      t.push( {id: r.id, text: r.content, completed: Boolean(r.completed)})
    }
    console.log(JSON.stringify(t))
    return {
      statusCode: 200,
      body: JSON.stringify(t),
    };
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify(e),
    };
  };
}
