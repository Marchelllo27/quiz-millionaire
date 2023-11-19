const TestComponent = () => {

  const submitHandler = e => {
    e.preventDefault();
    console.log(e);
    const name = e.target[0].value; 
    // or  const name = e.target.username.value;
    // or const { username } = e.target.elements
  };

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="username">What is your name?</label>
      <input type="text" id="username" name="username" minLength={2} required />
      <button>Submit</button>
    </form>
  );
};
export default TestComponent;
