import fs from "fs";

const log = (message: string): void => {
  folder();
  const now = new Date();

  let today = now.toDateString().replaceAll(" ", "-");

  const m = now.toLocaleString() + ": " + message + "\n";
  fs.appendFile(`./logs/${today}.txt`, m, function (err) {
    if (err) {
      // append failed
      throw err;
    } else {
      // done
    }
  });
};

const warning = (message: string): void => {
  folder();
  const now = new Date();

  let today = now.toDateString().replaceAll(" ", "-");

  const m = "**WARNING** " + now.toLocaleString() + ": " + message + "\n";
  fs.appendFile(`./logs/${today}.txt`, m, function (err) {
    if (err) {
      // append failed
      throw err;
    } else {
      // done
    }
  });
};

const error = (message: string): void => {
  folder();
  const now = new Date();

  let today = now.toDateString().replaceAll(" ", "-");

  const m = "**ERROR** " + now.toLocaleString() + ": " + message + "\n";
  fs.appendFile(`./logs/${today}.txt`, m, function (err) {
    if (err) {
      // append failed
      throw err;
    } else {
      // done
    }
  });
};

const folder = () => {
  if (!fs.existsSync("./logs")) {
    fs.mkdirSync("./logs");
  }
};

export { log, warning, error };
