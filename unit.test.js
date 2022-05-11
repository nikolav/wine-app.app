
// import functions



test("returns number", () => {
    const x = 10;
    expect(x).toBeTruthy();
});


// mock async/3rd party codo in separate place `__mock__` folder
// const get = (url) => {
//     return Promise.resolve({data: {title: "post #1"}});
// }
// module.exports = get;


// jest.mock("./fetchData.js");
