//Import
import readline from "readline";
import util from "util";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const rsi = require("fs");
let data = require("./dataStorage.json");
let ve_data = require("./pslot.json");

console.log(
  "\n                       Welcome to XYZ Corp Parking System!\n------------------------------------------------------------------------\n"
);

let prompt = "Choose your action [ p - park, u - unpark, m - map, x - exit ]:";
const cej = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt,
});

cej.prompt();

cej.on("line", (line) => {
  switch (line.trim()) {
    case "x":
      cej.close();

      break;
    case "p":
      cej.question(
        "Choose Vehicle Size [ 0-Small, 1-Medium, 2-Large ]: ",
        function (size) {
          switch (size) {
            case "0":
              cej.question(
                "Here are the available slot [ 0-SP, 1-MP, 2-LP ]: ",
                function (slot) {
                  const AStored = new Array();
                  const BStored = new Array();
                  const CStored = new Array();
                  if (slot == 0) {
                    console.log(
                      "\x1b[36m%s\x1b[0m",
                      "Parking A (types: small): "
                    );
                    let a_count = 0;
                    for (let i = 0; i < 10; i++) {
                      let space = JSON.stringify(ve_data[0].Park_A[i].occupied);
                      let type = JSON.stringify(ve_data[0].Park_A[i].p_type);
                      if (space == '"none"' && type == '"SP"') {
                        console.log(
                          "Parking Space (" +
                          JSON.stringify(ve_data[0].Park_A[i].space)
                            .replace('"', " ")
                            .replace('"', " ") +
                          ") -> occupied: " +
                          space
                        );
                        AStored[i] = parseInt(
                          JSON.stringify(ve_data[0].Park_A[i].space)
                            .replace('"', " ")
                            .replace('"', " "),
                          10
                        );
                        a_count++;
                      }
                    }
                    if (a_count == 0) {
                      console.log(
                        "Sorry, no available slot for now in this parking area!"
                      );
                    }

                    // Parking B
                    console.log(
                      "\x1b[36m%s\x1b[0m",
                      "\nParking B (types: small): "
                    );
                    let b_count = 0;
                    for (let i = 0; i < 10; i++) {
                      let space = JSON.stringify(ve_data[1].Park_B[i].occupied);
                      let type = JSON.stringify(ve_data[1].Park_B[i].p_type);
                      if (space == '"none"' && type == '"SP"') {
                        console.log(
                          "Parking Space (" +
                          JSON.stringify(ve_data[1].Park_B[i].space)
                            .replace('"', " ")
                            .replace('"', " ") +
                          ") -> occupied: " +
                          space
                        );
                        BStored[i] = parseInt(
                          JSON.stringify(ve_data[1].Park_B[i].space)
                            .replace('"', " ")
                            .replace('"', " "),
                          10
                        );
                        b_count++;
                      }
                    }
                    if (b_count == 0) {
                      console.log(
                        "Sorry,  no available slot for now in this parking area!"
                      );
                    }

                    // Parking C

                    console.log(
                      "\x1b[36m%s\x1b[0m",
                      "\nParking C (types: small): "
                    );
                    let c_count = 0;
                    for (let i = 0; i < 10; i++) {
                      let space = JSON.stringify(ve_data[2].Park_C[i].occupied);
                      let type = JSON.stringify(ve_data[2].Park_C[i].p_type);

                      if (space == '"none"' && type == '"SP"') {
                        console.log(
                          "Parking Space (" +
                          JSON.stringify(ve_data[2].Park_C[i].space)
                            .replace('"', " ")
                            .replace('"', " ") +
                          ") -> occupied: " +
                          space
                        );
                        CStored[i] = parseInt(
                          JSON.stringify(ve_data[2].Park_C[i].space)
                            .replace('"', " ")
                            .replace('"', " "),
                          10
                        );
                        c_count++;
                      }
                    }
                    if (c_count == 0) {
                      console.log(
                        "Sorry,  no available slot for now in this parking area!"
                      );
                    }

                    cej.question("\nChoose slot(ex: A-1): ", function (c_slot) {
                      const array = c_slot.split("-");

                      try {
                        cej.question(
                          "Vehicle Owner's name: ",
                          function (name) {
                            let check_process = false;
                            if (
                              array[0].toLowerCase() == "a" &&
                              AStored.includes(parseInt(array[1], 10))
                            ) {
                              ve_data[0].Park_A[array[1] - 1].occupied = "yes";
                              rsi.writeFileSync(
                                "./pslot.json",
                                JSON.stringify(ve_data, null, 4)
                              );

                              check_process = true;
                            } else if (
                              array[0].toLowerCase() == "b" &&
                              BStored.includes(parseInt(array[1], 10))
                            ) {
                              ve_data[1].Park_B[array[1] - 1].occupied = "yes";
                              rsi.writeFileSync(
                                "./pslot.json",
                                JSON.stringify(ve_data, null, 4)
                              );
                              check_process = true;
                            } else if (
                              array[0].toLowerCase() == "c" &&
                              CStored.includes(parseInt(array[1], 10))
                            ) {
                              ve_data[2].Park_C[array[1] - 1].occupied = "yes";
                              rsi.writeFileSync(
                                "./pslot.json",
                                JSON.stringify(ve_data, null, 4)
                              );
                              check_process = true;
                            } else {
                              console.log("Something's wrong, try again!");
                            }
                            if (check_process) {
                              console.log("You've Successfully Parked!");
                              var jsonObject = [
                                {
                                  park: array[0].toUpperCase(),
                                  space: parseInt(array[1], 10),
                                  name: name,
                                  v_size: size,
                                  p_type: "SP",
                                  date: fDate(new Date())
                                },

                              ];
                              data = require("./dataStorage.json");
                              let combineData = JSON.stringify(
                                data.concat(jsonObject),
                                null,
                                4
                              );
                              rsi.writeFileSync("./dataStorage.json", combineData);
                              delete require.cache[
                                require.resolve("./dataStorage.json")
                              ];
                              data = require("./dataStorage.json");
                            }
                            delete require.cache[
                              require.resolve("./pslot.json")
                            ];
                            ve_data = require("./pslot.json");
                          }
                        );
                      } catch (e) {
                        console.log(e.message);
                      }
                    });
                  } else if (slot == 1) {
                    console.log(
                      "\x1b[36m%s\x1b[0m",
                      "Parking A (types: medium): "
                    );

                    let a_count = 0;
                    for (let i = 0; i < 10; i++) {
                      let space = JSON.stringify(ve_data[0].Park_A[i].occupied);
                      let type = JSON.stringify(ve_data[0].Park_A[i].p_type);
                      if (space == '"none"' && type == '"MP"') {
                        console.log(
                          "Parking Space (" +
                          JSON.stringify(ve_data[0].Park_A[i].space)
                            .replace('"', " ")
                            .replace('"', " ") +
                          ") -> occupied: " +
                          space
                        );
                        AStored[i] = parseInt(
                          JSON.stringify(ve_data[0].Park_A[i].space)
                            .replace('"', " ")
                            .replace('"', " "),
                          10
                        );
                        a_count++;
                      }
                    }

                    //Display Error Messages
                    if (a_count == 0) {
                      console.log(
                        "Sorry, no available slot for now in this parking area!"
                      );
                    }

                    // Parking B
                    console.log(
                      "\x1b[36m%s\x1b[0m",
                      "\nParking B (types: medium): "
                    );
                    let b_count = 0;
                    for (let i = 0; i < 10; i++) {
                      let space = JSON.stringify(ve_data[1].Park_B[i].occupied);
                      let type = JSON.stringify(ve_data[1].Park_B[i].p_type);
                      if (space == '"none"' && type == '"MP"') {
                        console.log(
                          "Parking Space (" +
                          JSON.stringify(ve_data[1].Park_B[i].space)
                            .replace('"', " ")
                            .replace('"', " ") +
                          ") -> occupied: " +
                          space
                        );
                        BStored[i] = parseInt(
                          JSON.stringify(ve_data[1].Park_B[i].space)
                            .replace('"', " ")
                            .replace('"', " "),
                          10
                        );
                        b_count++;
                      }
                    }
                    if (b_count == 0) {
                      console.log(
                        "Sorry, no available slot for now in this parking area!"
                      );
                    }
                    // Parking C

                    console.log(
                      "\x1b[36m%s\x1b[0m",
                      "\nParking C (types: medium): "
                    );
                    let c_count = 0;
                    for (let i = 0; i < 10; i++) {
                      let space = JSON.stringify(ve_data[2].Park_C[i].occupied);
                      let type = JSON.stringify(ve_data[2].Park_C[i].p_type);

                      if (space == '"none"' && type == '"MP"') {
                        console.log(
                          "Parking Space (" +
                          JSON.stringify(ve_data[2].Park_C[i].space)
                            .replace('"', " ")
                            .replace('"', " ") +
                          ") -> occupied: " +
                          space
                        );
                        CStored[i] = parseInt(
                          JSON.stringify(ve_data[2].Park_C[i].space)
                            .replace('"', " ")
                            .replace('"', " "),
                          10
                        );
                        c_count++;
                      }
                    }

                    //Error Display
                    if (c_count == 0) {
                      console.log(
                        "Sorry,  no available slot for now in this parking area!"
                      );
                    }

                    //Choose slot
                    cej.question("\nChoose slot(ex: A-1): ", function (c_slot) {
                      const array = c_slot.split("-");

                      try {
                        cej.question(
                          "Vehicle Owner's name: ",
                          function (name) {
                            let check_process = false;
                            if (
                              array[0].toLowerCase() == "a" &&
                              AStored.includes(parseInt(array[1], 10))
                            ) {
                              ve_data[0].Park_A[array[1] - 1].occupied = "yes";
                              rsi.writeFileSync(
                                "./pslot.json",
                                JSON.stringify(ve_data, null, 4)
                              );
                              check_process = true;
                            } else if (
                              array[0].toLowerCase() == "b" &&
                              BStored.includes(parseInt(array[1], 10))
                            ) {
                              ve_data[1].Park_B[array[1] - 1].occupied = "yes";
                              rsi.writeFileSync(
                                "./pslot.json",
                                JSON.stringify(ve_data, null, 4)
                              );
                              check_process = true;
                            } else if (
                              array[0].toLowerCase() == "c" &&
                              CStored.includes(parseInt(array[1], 10))
                            ) {
                              ve_data[2].Park_C[array[1] - 1].occupied = "yes";
                              rsi.writeFileSync(
                                "./pslot.json",
                                JSON.stringify(ve_data, null, 4)
                              );
                              check_process = true;
                            } else {
                              console.log("Something's wrong, try again!");
                            }
                            if (check_process) {
                              console.log("You've successfully parked!");
                              var jsonObject = [
                                {
                                  park: array[0].toUpperCase(),
                                  space: parseInt(array[1], 10),
                                  name: name,
                                  v_size: size,
                                  p_type: "MP",
                                  date: fDate(new Date())
                                },
                              ];

                              let combineData = JSON.stringify(
                                data.concat(jsonObject),
                                null,
                                4
                              );
                              rsi.writeFileSync("./dataStorage.json", combineData);
                              delete require.cache[
                                require.resolve("./dataStorage.json")
                              ];
                              data = require("./dataStorage.json");
                            }
                            delete require.cache[
                              require.resolve("./pslot.json")
                            ];
                            ve_data = require("./pslot.json");
                          }
                        );
                      } catch (e) {
                        console.log(e.message);
                      }
                    });
                  } else if (slot == 2) {

                    //Display Parking information
                    console.log(
                      "\x1b[36m%s\x1b[0m",
                      "Parking A (types: large): "
                    );
                    let a_count = 0;
                    for (let i = 0; i < 10; i++) {
                      let space = JSON.stringify(ve_data[0].Park_A[i].occupied);
                      let type = JSON.stringify(ve_data[0].Park_A[i].p_type);
                      if (space == '"none"' && type == '"LP"') {
                        console.log(
                          "Parking Space (" +
                          JSON.stringify(ve_data[0].Park_A[i].space)
                            .replace('"', " ")
                            .replace('"', " ") +
                          ") -> occupied: " +
                          space
                        );
                        AStored[i] = parseInt(
                          JSON.stringify(ve_data[0].Park_A[i].space)
                            .replace('"', " ")
                            .replace('"', " "),
                          10
                        );
                        a_count++;
                      }
                    }

                    //Display Error Messages
                    if (a_count == 0) {
                      console.log(
                        "Sorry,  no available slot for now in this parking area!"
                      );
                    }

                    // Parking B
                    console.log(
                      "\x1b[36m%s\x1b[0m",
                      "\nParking B (types: large): "
                    );
                    let b_count = 0;
                    for (let i = 0; i < 10; i++) {
                      let space = JSON.stringify(ve_data[1].Park_B[i].occupied);
                      let type = JSON.stringify(ve_data[1].Park_B[i].p_type);
                      if (space == '"none"' && type == '"LP"') {
                        console.log(
                          "Parking Space (" +
                          JSON.stringify(ve_data[1].Park_B[i].space)
                            .replace('"', " ")
                            .replace('"', " ") +
                          ") -> occupied: " +
                          space
                        );
                        BStored[i] = parseInt(
                          JSON.stringify(ve_data[1].Park_B[i].space)
                            .replace('"', " ")
                            .replace('"', " "),
                          10
                        );
                        b_count++;
                      }
                    }
                    //Display Error Messages
                    if (b_count == 0) {
                      console.log(
                        "Sorry,  no available slot for now in this parking area!"
                      );
                    }
                    // Parking C

                    console.log(
                      "\x1b[36m%s\x1b[0m",
                      "\nParking C (types: large): "
                    );
                    let c_count = 0;
                    for (let i = 0; i < 10; i++) {
                      let space = JSON.stringify(ve_data[2].Park_C[i].occupied);
                      let type = JSON.stringify(ve_data[2].Park_C[i].p_type);

                      if (space == '"none"' && type == '"LP"') {
                        console.log(
                          "Parking Space (" +
                          JSON.stringify(ve_data[2].Park_C[i].space)
                            .replace('"', " ")
                            .replace('"', " ") +
                          ") -> occupied: " +
                          space
                        );
                        CStored[i] = parseInt(
                          JSON.stringify(ve_data[2].Park_C[i].space)
                            .replace('"', " ")
                            .replace('"', " "),
                          10
                        );
                        c_count++;
                      }
                    }

                    //Display Error Parking Area
                    if (c_count == 0) {
                      console.log(
                        "Sorry, no available slot for now in this parking area!"
                      );
                    }

                    //Diplay Choose Parking Spaces
                    cej.question("\nChoose slot(ex: A-1): ", function (c_slot) {
                      const array = c_slot.split("-");

                      //Display question
                      try {
                        cej.question(
                          "Vehicle Owner's name: ",
                          function (name) {
                            let check_process = false;
                            if (
                              array[0].toLowerCase() == "a" &&
                              AStored.includes(parseInt(array[1], 10))
                            ) {
                              ve_data[0].Park_A[array[1] - 1].occupied = "yes";
                              rsi.writeFileSync(
                                "./pslot.json",
                                JSON.stringify(ve_data, null, 4)
                              );
                              check_process = true;
                            } else if (
                              array[0].toLowerCase() == "b" &&
                              BStored.includes(parseInt(array[1], 10))
                            ) {
                              ve_data[1].Park_B[array[1] - 1].occupied = "yes";
                              rsi.writeFileSync(
                                "./pslot.json",
                                JSON.stringify(ve_data, null, 4)
                              );
                              check_process = true;
                            } else if (
                              array[0].toLowerCase() == "c" &&
                              CStored.includes(parseInt(array[1], 10))
                            ) {
                              ve_data[2].Park_C[array[1] - 1].occupied = "yes";
                              rsi.writeFileSync(
                                "./pslot.json",
                                JSON.stringify(ve_data, null, 4)
                              );
                              check_process = true;
                            } else {
                              console.log("Something's wrong, try again!");
                            }

                            //Display Success Parked
                            if (check_process) {
                              console.log("You've Successfully parked!");
                              var jsonObject = [
                                {
                                  park: array[0].toUpperCase(),
                                  space: parseInt(array[1], 10),
                                  name: name,
                                  v_size: size,
                                  p_type: "LP",
                                  date: fDate(new Date())
                                },
                              ];

                              let combineData = JSON.stringify(
                                data.concat(jsonObject),
                                null,
                                4
                              );
                              rsi.writeFileSync("./dataStorage.json", combineData);
                              delete require.cache[
                                require.resolve("./dataStorage.json")
                              ];
                              data = require("./dataStorage.json");
                            }
                            delete require.cache[
                              require.resolve("./pslot.json")
                            ];
                            ve_data = require("./pslot.json");
                          }
                        );

                      } catch (e) {
                        console.log(e.message);
                      }
                    });
                  }
                }
              );
              break;

            //Display Parking Spaces Available
            case "1":
              cej.question("Here are the available [ 1-MP, 2-LP ]: ", function (slot) {
                const AStored = new Array();
                const BStored = new Array();
                const CStored = new Array();

                if (slot == 1) {
                  console.log(
                    "\x1b[36m%s\x1b[0m",
                    "Parking A (types: medium): "
                  );
                  let a_count = 0;
                  for (let i = 0; i < 10; i++) {
                    let space = JSON.stringify(ve_data[0].Park_A[i].occupied);
                    let type = JSON.stringify(ve_data[0].Park_A[i].p_type);
                    if (space == '"none"' && type == '"MP"') {
                      console.log(
                        "Parking Space (" +
                        JSON.stringify(ve_data[0].Park_A[i].space)
                          .replace('"', " ")
                          .replace('"', " ") +
                        ") -> occupied: " +
                        space
                      );
                      AStored[i] = parseInt(
                        JSON.stringify(ve_data[0].Park_A[i].space)
                          .replace('"', " ")
                          .replace('"', " "),
                        10
                      );
                      a_count++;
                    }
                  }

                  //Display Error Messages
                  if (a_count == 0) {
                    console.log(
                      "Sorry, no available slot for now in this parking area!"
                    );
                  }
                  // Parking B
                  console.log(
                    "\x1b[36m%s\x1b[0m",
                    "\nParking B (types: medium): "
                  );
                  let b_count = 0;
                  for (let i = 0; i < 10; i++) {
                    let space = JSON.stringify(ve_data[1].Park_B[i].occupied);
                    let type = JSON.stringify(ve_data[1].Park_B[i].p_type);
                    if (space == '"none"' && type == '"MP"') {
                      console.log(
                        "Parking Space (" +
                        JSON.stringify(ve_data[1].Park_B[i].space)
                          .replace('"', " ")
                          .replace('"', " ") +
                        ") -> occupied: " +
                        space
                      );
                      BStored[i] = parseInt(
                        JSON.stringify(ve_data[1].Park_B[i].space)
                          .replace('"', " ")
                          .replace('"', " "),
                        10
                      );
                      b_count++;
                    }
                  }
                  if (b_count == 0) {
                    console.log(
                      "Sorry,  no available slot for now in this parking area!"
                    );
                  }

                  // Parking C

                  console.log(
                    "\x1b[36m%s\x1b[0m",
                    "\nParking C (types: medium): "
                  );
                  let c_count = 0;
                  for (let i = 0; i < 10; i++) {
                    let space = JSON.stringify(ve_data[2].Park_C[i].occupied);
                    let type = JSON.stringify(ve_data[2].Park_C[i].p_type);

                    if (space == '"none"' && type == '"MP"') {
                      console.log(
                        "Parking Space (" +
                        JSON.stringify(ve_data[2].Park_C[i].space)
                          .replace('"', " ")
                          .replace('"', " ") +
                        ") -> occupied: " +
                        space
                      );
                      CStored[i] = parseInt(
                        JSON.stringify(ve_data[2].Park_C[i].space)
                          .replace('"', " ")
                          .replace('"', " "),
                        10
                      );
                      c_count++;
                    }
                  }

                  //Display Error Messages
                  if (c_count == 0) {
                    console.log(
                      "Sorry,  no available slot for now in this parking area!"
                    );
                  }

                  //Display Choose slot information
                  cej.question("\nChoose slot(ex: A-1): ", function (c_slot) {
                    const array = c_slot.split("-");

                    try {
                      cej.question(
                        "Vehicle Owner's name: ",
                        function (name) {
                          let check_process = false;
                          if (
                            array[0].toLowerCase() == "a" &&
                            AStored.includes(parseInt(array[1], 10))
                          ) {
                            ve_data[0].Park_A[array[1] - 1].occupied = "yes";
                            rsi.writeFileSync(
                              "./pslot.json",
                              JSON.stringify(ve_data, null, 4)
                            );
                            check_process = true;
                          } else if (
                            array[0].toLowerCase() == "b" &&
                            BStored.includes(parseInt(array[1], 10))
                          ) {
                            ve_data[1].Park_B[array[1] - 1].occupied = "yes";
                            rsi.writeFileSync(
                              "./pslot.json",
                              JSON.stringify(ve_data, null, 4)
                            );
                            check_process = true;
                          } else if (
                            array[0].toLowerCase() == "c" &&
                            CStored.includes(parseInt(array[1], 10))
                          ) {
                            ve_data[2].Park_C[array[1] - 1].occupied = "yes";
                            rsi.writeFileSync(
                              "./pslot.json",
                              JSON.stringify(ve_data, null, 4)
                            );
                            check_process = true;
                          } else {
                            console.log("Something's wrong, try again!");
                          }
                          if (check_process) {
                            console.log("vehicle successfully parked!");
                            var jsonObject = [
                              {
                                park: array[0].toUpperCase(),
                                space: parseInt(array[1], 10),
                                name: name,
                                v_size: size,
                                p_type: "MP",
                                date: fDate(new Date())
                              },
                            ];
                            data = require("./dataStorage.json");
                            let combineData = JSON.stringify(
                              data.concat(jsonObject),
                              null,
                              4
                            );
                            rsi.writeFileSync("./dataStorage.json", combineData);
                            delete require.cache[
                              require.resolve("./dataStorage.json")
                            ];
                            data = require("./dataStorage.json");
                          }
                          delete require.cache[
                            require.resolve("./pslot.json")
                          ];
                          ve_data = require("./pslot.json");
                        }
                      );
                    } catch (e) {
                      console.log(e.message);
                    }
                  });
                } else if (slot == 2) {
                  console.log(
                    "\x1b[36m%s\x1b[0m",
                    "Parking A (types: large): "
                  );
                  let a_count = 0;
                  for (let i = 0; i < 10; i++) {
                    let space = JSON.stringify(ve_data[0].Park_A[i].occupied);
                    let type = JSON.stringify(ve_data[0].Park_A[i].p_type);
                    if (space == '"none"' && type == '"LP"') {
                      console.log(
                        "Parking Space (" +
                        JSON.stringify(ve_data[0].Park_A[i].space)
                          .replace('"', " ")
                          .replace('"', " ") +
                        ") -> occupied: " +
                        space
                      );
                      AStored[i] = parseInt(
                        JSON.stringify(ve_data[0].Park_A[i].space)
                          .replace('"', " ")
                          .replace('"', " "),
                        10
                      );
                      a_count++;
                    }
                  }

                  //Display Error Messages
                  if (a_count == 0) {
                    console.log(
                      "Sorry,  no available slot for now in this parking area!"
                    );
                  }
                  // Parking B
                  console.log(
                    "\x1b[36m%s\x1b[0m",
                    "\nParking B (types: large): "
                  );
                  let b_count = 0;
                  for (let i = 0; i < 10; i++) {
                    let space = JSON.stringify(ve_data[1].Park_B[i].occupied);
                    let type = JSON.stringify(ve_data[1].Park_B[i].p_type);
                    if (space == '"none"' && type == '"LP"') {
                      console.log(
                        "Parking Space (" +
                        JSON.stringify(ve_data[1].Park_B[i].space)
                          .replace('"', " ")
                          .replace('"', " ") +
                        ") -> occupied: " +
                        space
                      );
                      BStored[i] = parseInt(
                        JSON.stringify(ve_data[1].Park_B[i].space)
                          .replace('"', " ")
                          .replace('"', " "),
                        10
                      );
                      b_count++;
                    }
                  }

                  //Display Error Messages
                  if (b_count == 0) {
                    console.log(
                      "Sorry,  no available slot for now in this parking area!"
                    );
                  }
                  // Parking C

                  console.log(
                    "\x1b[36m%s\x1b[0m",
                    "\nParking C (types: large): "
                  );
                  let c_count = 0;
                  for (let i = 0; i < 10; i++) {
                    let space = JSON.stringify(ve_data[2].Park_C[i].occupied);
                    let type = JSON.stringify(ve_data[2].Park_C[i].p_type);

                    if (space == '"none"' && type == '"LP"') {
                      console.log(
                        "Parking Space (" +
                        JSON.stringify(ve_data[2].Park_C[i].space)
                          .replace('"', " ")
                          .replace('"', " ") +
                        ") -> occupied: " +
                        space
                      );
                      CStored[i] = parseInt(
                        JSON.stringify(ve_data[2].Park_C[i].space)
                          .replace('"', " ")
                          .replace('"', " "),
                        10
                      );
                      c_count++;
                    }
                  }

                  //Display Error Messages
                  if (c_count == 0) {
                    console.log(
                      "Sorry,  no available slot for now in this parking area!"
                    );
                  }

                  cej.question("\nChoose slot(ex: A-1): ", function (c_slot) {
                    const array = c_slot.split("-");

                    try {
                      cej.question(
                        "Vehicle Owner's name: ",
                        function (name) {
                          let check_process = false;
                          if (
                            array[0].toLowerCase() == "a" &&
                            AStored.includes(parseInt(array[1], 10))
                          ) {
                            ve_data[0].Park_A[array[1] - 1].occupied = "yes";
                            rsi.writeFileSync(
                              "./pslot.json",
                              JSON.stringify(ve_data, null, 4)
                            );
                            check_process = true;
                          } else if (
                            array[0].toLowerCase() == "b" &&
                            BStored.includes(parseInt(array[1], 10))
                          ) {
                            ve_data[1].Park_B[array[1] - 1].occupied = "yes";
                            rsi.writeFileSync(
                              "./pslot.json",
                              JSON.stringify(ve_data, null, 4)
                            );
                            check_process = true;
                          } else if (
                            array[0].toLowerCase() == "c" &&
                            CStored.includes(parseInt(array[1], 10))
                          ) {
                            ve_data[2].Park_C[array[1] - 1].occupied = "yes";
                            rsi.writeFileSync(
                              "./pslot.json",
                              JSON.stringify(ve_data, null, 4)
                            );
                            check_process = true;
                          } else {
                            console.log("Something's wrong, try again!");
                          }
                          if (check_process) {
                            console.log("vehicle successfully parked!");
                            var jsonObject = [
                              {
                                park: array[0].toUpperCase(),
                                space: parseInt(array[1], 10),
                                name: name,
                                v_size: size,
                                p_type: "LP",
                                date: fDate(new Date())
                              },
                            ];

                            let combineData = JSON.stringify(
                              data.concat(jsonObject),
                              null,
                              4
                            );
                            rsi.writeFileSync("./dataStorage.json", combineData);
                            delete require.cache[
                              require.resolve("./dataStorage.json")
                            ];
                            data = require("./dataStorage.json");
                          }
                          delete require.cache[
                            require.resolve("./pslot.json")
                          ];
                          ve_data = require("./pslot.json");
                        }
                      );
                    } catch (e) {
                      console.log(e.message);
                    }
                  });
                }
              });
              break;
            case "2":
              cej.question("Parking Spaces Available [ 2-LP ]: ", function (slot) {
                const AStored = new Array();
                const BStored = new Array();
                const CStored = new Array();
                if (slot == 2) {
                  console.log(
                    "\x1b[36m%s\x1b[0m",
                    "Parking A (types: large): "
                  );
                  let a_count = 0;
                  for (let i = 0; i < 10; i++) {
                    let space = JSON.stringify(ve_data[0].Park_A[i].occupied);
                    let type = JSON.stringify(ve_data[0].Park_A[i].p_type);
                    if (space == '"none"' && type == '"LP"') {
                      console.log(
                        "Parking Space (" +
                        JSON.stringify(ve_data[0].Park_A[i].space)
                          .replace('"', " ")
                          .replace('"', " ") +
                        ") -> occupied: " +
                        space
                      );
                      AStored[i] = parseInt(
                        JSON.stringify(ve_data[0].Park_A[i].space)
                          .replace('"', " ")
                          .replace('"', " "),
                        10
                      );
                      a_count++;
                    }
                  }

                  //Display Error Messages
                  if (a_count == 0) {
                    console.log(
                      "Sorry,  no available slot for now in this parking area!"
                    );
                  }
                  // Parking B
                  console.log(
                    "\x1b[36m%s\x1b[0m",
                    "\nParking B (types: large): "
                  );
                  let b_count = 0;
                  for (let i = 0; i < 10; i++) {
                    let space = JSON.stringify(ve_data[1].Park_B[i].occupied);
                    let type = JSON.stringify(ve_data[1].Park_B[i].p_type);
                    if (space == '"none"' && type == '"LP"') {
                      console.log(
                        "Parking Space (" +
                        JSON.stringify(ve_data[1].Park_B[i].space)
                          .replace('"', " ")
                          .replace('"', " ") +
                        ") -> occupied: " +
                        space
                      );
                      BStored[i] = parseInt(
                        JSON.stringify(ve_data[1].Park_B[i].space)
                          .replace('"', " ")
                          .replace('"', " "),
                        10
                      );
                      b_count++;
                    }
                  }

                  //Display Error Messages
                  if (b_count == 0) {
                    console.log(
                      "Sorry,  no available slot for now in this parking area!"
                    );
                  }
                  // Parking C

                  console.log(
                    "\x1b[36m%s\x1b[0m",
                    "\nParking C (types: large): "
                  );
                  let c_count = 0;
                  for (let i = 0; i < 10; i++) {
                    let space = JSON.stringify(ve_data[2].Park_C[i].occupied);
                    let type = JSON.stringify(ve_data[2].Park_C[i].p_type);

                    if (space == '"none"' && type == '"LP"') {
                      console.log(
                        "Parking Space (" +
                        JSON.stringify(ve_data[2].Park_C[i].space)
                          .replace('"', " ")
                          .replace('"', " ") +
                        ") -> occupied: " +
                        space
                      );
                      CStored[i] = parseInt(
                        JSON.stringify(ve_data[2].Park_C[i].space)
                          .replace('"', " ")
                          .replace('"', " "),
                        10
                      );
                      c_count++;
                    }
                  }
                  //Display Error Messages
                  if (c_count == 0) {
                    console.log(
                      "Sorry,  no available slot for now in this parking area!"
                    );
                  }

                  cej.question("\nChoose slot(ex: A-1): ", function (c_slot) {
                    const array = c_slot.split("-");

                    try {
                      cej.question(
                        "Vehicle Owner's name: ",
                        function (name) {
                          let check_process = false;
                          if (
                            array[0].toLowerCase() == "a" &&
                            AStored.includes(parseInt(array[1], 10))
                          ) {
                            ve_data[0].Park_A[array[1] - 1].occupied = "yes";
                            rsi.writeFileSync(
                              "./pslot.json",
                              JSON.stringify(ve_data, null, 4)
                            );
                            check_process = true;
                          } else if (
                            array[0].toLowerCase() == "b" &&
                            BStored.includes(parseInt(array[1], 10))
                          ) {
                            ve_data[1].Park_B[array[1] - 1].occupied = "yes";
                            rsi.writeFileSync(
                              "./pslot.json",
                              JSON.stringify(ve_data, null, 4)
                            );
                            check_process = true;
                          } else if (
                            array[0].toLowerCase() == "c" &&
                            CStored.includes(parseInt(array[1], 10))
                          ) {
                            ve_data[2].Park_C[array[1] - 1].occupied = "yes";
                            rsi.writeFileSync(
                              "./pslot.json",
                              JSON.stringify(ve_data, null, 4)
                            );
                            check_process = true;
                          } else {
                            console.log("Something's wrong, try again!");
                          }
                          if (check_process) {
                            console.log("vehicle successfully parked!");
                            var jsonObject = [
                              {
                                park: array[0].toUpperCase(),
                                space: parseInt(array[1], 10),
                                name: name,
                                v_size: size,
                                p_type: "LP",
                                date: fDate(new Date())
                              },
                            ];

                            let combineData = JSON.stringify(
                              data.concat(jsonObject),
                              null,
                              4
                            );
                            rsi.writeFileSync("./dataStorage.json", combineData);
                            delete require.cache[
                              require.resolve("./dataStorage.json")
                            ];
                            data = require("./dataStorage.json");
                          }
                          delete require.cache[
                            require.resolve("./pslot.json")
                          ];
                          ve_data = require("./pslot.json");
                        }
                      );
                    } catch (e) {
                      console.log(e.message);
                    }
                  });
                }
              });
              break;
            default:
              break;
          }
        }
      );

      break;

    //Display of Locate Vehicle to unpark
    case "u":
      cej.question(
        "Unpark your vehicle if you know it's location. Locate if you don't know.(use map) [Parking Area - row column | ex:A - 1 5]: ",
        function (loc) {
          try {
            let stcejoc = loc.split("-");


            let loc_index = stcejoc[1].trim().split(" ");
            delete require.cache[require.resolve("./pslot.json")];
            delete require.cache[require.resolve("./dataStorage.json")];
            data = require("./dataStorage.json");
            ve_data = require("./pslot.json");

            if (stcejoc[0].trim().toUpperCase() == "A") {

              const row = ve_data[0].Park_A[loc_index[1] - 1].row;
              const column = ve_data[0].Park_A[loc_index[1] - 1].col;
              let occupy = ve_data[0].Park_A[loc_index[1] - 1].occupied;
              // console.log(occupy);
              if (Number(row) == loc_index[0] && occupy == "yes") {

                console.log("Entire payments shown below: \n");

                ve_data[0].Park_A[loc_index[1] - 1].occupied = "none";

                for (let i = 0; i < data.length; i++) {
                  if (data[i].park.toUpperCase() == "A" && data[i].space == column) {

                    console.log("Owner: " + data[i].name);
                    // Show vehicle size
                    if (data[i].v_size == "0") {
                      console.log("Vehicle Size: Small");
                    } else if (data[i].v_size == "1") {
                      console.log("Vehicle Size: Medium");
                    }
                    else if (data[i].v_size == "2") {
                      console.log("Vehicle Size: Large");
                    }
                    // Show parking type
                    let p_type = null;
                    if (data[i].p_type == "SP") {
                      console.log("Parking Type: Small (SP)");
                      p_type = "SP";
                    } else if (data[i].p_type == "MP") {
                      console.log("Parking Type: Medium (MP)");
                      p_type = "MP";
                    }
                    else if (data[i].p_type == "LP") {
                      console.log("Parking Type: Large (LP)");
                      p_type = "LP";
                    }

                    console.log("Parking Area: A");
                    console.log(`Space: ${column}`);
                    console.log(`Location: ( row: ${row}, column: ${column} )`);
                    console.log(`Date: ${data[i].date}`);

                    let hours = Math.round(diff_hrs(parkDate(new Date()), parkDate(new Date(data[i].date))));
                    let payments = 0;
                    console.log("Total hours: " + diff_hrs(parkDate(new Date()), parkDate(new Date(data[i].date))).toFixed(2) + "hr/s");


                    // console.log(p_type);
                    console.log("\n--------------------------------------")
                    console.log("Total Payments:\n");
                    if (hours <= 3) {
                      // payments for the for the first 3 hours charge to 40 pesos
                      payments += 40;
                      console.log("     Initial charges (First 3 hours): " + payments);
                    }
                    else if (hours > 3 && hours <= 24) {
                      // payments for the for the first 3 hours charge to 40 pesos
                      payments += 40;
                      console.log("     Intial charges (First 3 hours): " + payments + " peso/s");

                      // another charges beyond the initial 3 hours

                      if (p_type == "SP") {
                        payments += hours * 20;
                        console.log("     Park-type(SP) charges (+20 pesos/hr): " + hours * 20 + " peso/s");

                      }
                      else if (p_type == "MP") {

                        payments += hours * 60;
                        console.log("     Park-type(MP) charges (+60 pesos/hr): " + hours * 60 + " peso/s");
                      }
                      else if (p_type == "LP") {

                        payments += hours * 100;
                        console.log("     Park-type(LP) charges (+100 pesos/hr): " + hours * 100 + " peso/s");
                      }
                    }
                    else if (hours > 24) {
                      // payments for the for the first 3 hours charge to 40 pesos
                      payments += 40;
                      let remainTime = parseInt(hours % 24);
                      payments += 5000 * parseInt(hours / 24);


                      console.log("     Initial charges (First 3 hours): " + 40 + " peso/s");
                      console.log("     full 24hours charges (+5000 pesos/24hr): " + 5000 * parseInt(hours / 24) + " peso/s");



                      //Calculate of Charges Amount
                      if (p_type == "SP") {
                        payments += remainTime * 20;
                        console.log("     Park-type(SP) charges (+20 pesos/hr): " + remainTime * 20 + " peso/s");

                      }
                      else if (p_type == "MP") {

                        payments += remainTime * 60;
                        console.log("     Park-type(MP) charges (+60 pesos/hr): " + remainTime * 60 + " peso/s");
                      }
                      else if (p_type == "LP") {

                        payments += remainTime * 100;
                        console.log("     Park-type(LP) charges (+100 pesos/hr): " + remainTime * 100 + " peso/s");
                      }
                    }

                    //Display total charges
                    console.log("     Overall Total: " + payments + " peso/s");
                    console.log("\n--------------------------------------")

                    cej.question(
                      "Unpark? [Yes or No]: ",
                      function (c) {

                        if (c.toLowerCase() == "yes") {
                          console.log("vehicle unpark sucessfully!");
                          data.splice(i, 1);
                          rsi.writeFileSync(
                            "./dataStorage.json",
                            JSON.stringify(data, null, 4)
                          );
                          rsi.writeFileSync(
                            "./pslot.json",
                            JSON.stringify(ve_data, null, 4)
                          );
                        } else if (c.toLowerCase() == "no") {
                          // go back
                        }
                        else {
                          console.log("Invalid type occurred!");
                        }


                      });


                  }

                }
              }
              else {
                console.log("Something's wrong, try again! ");
              }
            }
            if (stcejoc[0].trim().toUpperCase() == "B") {

              const row = ve_data[1].Park_B[loc_index[1] - 1].row;
              const column = ve_data[1].Park_B[loc_index[1] - 1].col;
              let occupy = ve_data[1].Park_B[loc_index[1] - 1].occupied;
              // console.log(occupy);
              if (Number(row) == loc_index[0] && occupy == "yes") {

                console.log("Entire payments shown below: \n");

                ve_data[1].Park_B[loc_index[1] - 1].occupied = "none";

                for (let i = 0; i < data.length; i++) {
                  if (data[i].park.toUpperCase() == "B" && data[i].space == column) {

                    console.log("Owner: " + data[i].name);
                    // Show vehicle size
                    if (data[i].v_size == "0") {
                      console.log("Vehicle Size: Small");
                    } else if (data[i].v_size == "1") {
                      console.log("Vehicle Size: Medium");
                    }
                    else if (data[i].v_size == "2") {
                      console.log("Vehicle Size: Large");
                    }
                    // Show parking type
                    let p_type = null;
                    if (data[i].p_type == "SP") {
                      console.log("Parking Type: Small (SP)");
                      p_type = "SP";
                    } else if (data[i].p_type == "MP") {
                      console.log("Parking Type: Medium (MP)");
                      p_type = "MP";
                    }
                    else if (data[i].p_type == "LP") {
                      console.log("Parking Type: Large (LP)");
                      p_type = "LP";
                    }

                    console.log("Parking Area: B");
                    console.log(`Space: ${column}`);
                    console.log(`Location: ( row: ${row}, column: ${column} )`);
                    console.log(`Date: ${data[i].date}`);

                    let hours = Math.round(diff_hrs(parkDate(new Date()), parkDate(new Date(data[i].date))));
                    let payments = 0;
                    console.log("Total hours: " + diff_hrs(parkDate(new Date()), parkDate(new Date(data[i].date))).toFixed(2) + "hr/s");


                    // console.log(p_type);
                    console.log("\n--------------------------------------")
                    console.log("Total Payments:\n");
                    if (hours <= 3) {
                      // payments for the for the first 3 hours charge to 40 pesos
                      payments += 40;
                      console.log("     Initial charges (First 3 hours): " + payments);
                    }
                    else if (hours > 3 && hours <= 24) {
                      // payments for the for the first 3 hours charge to 40 pesos
                      payments += 40;
                      console.log("     Intial charges (First 3 hours): " + payments + " peso/s");

                      // another charges beyond the initial 3 hours

                      if (p_type == "SP") {
                        payments += hours * 20;
                        console.log("     Park-type(SP) charges (+20 pesos/hr): " + hours * 20 + " peso/s");

                      }
                      else if (p_type == "MP") {

                        payments += hours * 60;
                        console.log("     Park-type(MP) charges (+60 pesos/hr): " + hours * 60 + " peso/s");
                      }
                      else if (p_type == "LP") {

                        payments += hours * 100;
                        console.log("     Park-type(LP) charges (+100 pesos/hr): " + hours * 100 + " peso/s");
                      }
                    }
                    else if (hours > 24) {
                      // payments for the for the first 3 hours charge to 40 pesos
                      payments += 40;
                      let remainTime = parseInt(hours % 24);
                      payments += 5000 * parseInt(hours / 24);


                      console.log("     Initial charges (First 3 hours): " + 40 + " peso/s");
                      console.log("     full 24hours charges (+5000 pesos/24hr): " + 5000 * parseInt(hours / 24) + " peso/s");




                      if (p_type == "SP") {
                        payments += remainTime * 20;
                        console.log("     Park-type(SP) charges (+20 pesos/hr): " + remainTime * 20 + " peso/s");

                      }
                      else if (p_type == "MP") {

                        payments += remainTime * 60;
                        console.log("     Park-type(MP) charges (+60 pesos/hr): " + remainTime * 60 + " peso/s");
                      }
                      else if (p_type == "LP") {

                        payments += remainTime * 100;
                        console.log("     Park-type(LP) charges (+100 pesos/hr): " + remainTime * 100 + " peso/s");
                      }
                    }

                    console.log("     Overall Total: " + payments + " peso/s");
                    console.log("\n--------------------------------------")

                    cej.question(
                      "Unpark? [Yes or No]: ",
                      function (c) {

                        if (c.toLowerCase() == "yes") {
                          console.log("vehicle unpark sucessfully!");
                          data.splice(i, 1);
                          rsi.writeFileSync(
                            "./dataStorage.json",
                            JSON.stringify(data, null, 4)
                          );
                          rsi.writeFileSync(
                            "./pslot.json",
                            JSON.stringify(ve_data, null, 4)
                          );
                        } else if (c.toLowerCase() == "no") {
                          // go back
                        }
                        else {
                          console.log("Invalid type occurred!");
                        }


                      });


                  }

                }
              }
              else {
                console.log("Something's wrong, try again! ");
              }
            }
            if (stcejoc[0].trim().toUpperCase() == "C") {

              const row = ve_data[2].Park_C[loc_index[1] - 1].row;
              const column = ve_data[2].Park_C[loc_index[1] - 1].col;
              let occupy = ve_data[2].Park_C[loc_index[1] - 1].occupied;
              // console.log(occupy);
              if (Number(row) == loc_index[0] && occupy == "yes") {

                console.log("Entire payments shown below: \n");

                ve_data[2].Park_C[loc_index[1] - 1].occupied = "none";

                for (let i = 0; i < data.length; i++) {
                  if (data[i].park.toUpperCase() == "C" && data[i].space == column) {

                    console.log("Owner: " + data[i].name);

                    // Show vehicle size
                    if (data[i].v_size == "0") {
                      console.log("Vehicle Size: Small");
                    } else if (data[i].v_size == "1") {
                      console.log("Vehicle Size: Medium");
                    }
                    else if (data[i].v_size == "2") {
                      console.log("Vehicle Size: Large");
                    }
                    // Show parking type
                    let p_type = null;
                    if (data[i].p_type == "SP") {
                      console.log("Parking Type: Small (SP)");
                      p_type = "SP";
                    } else if (data[i].p_type == "MP") {
                      console.log("Parking Type: Medium (MP)");
                      p_type = "MP";
                    }
                    else if (data[i].p_type == "LP") {
                      console.log("Parking Type: Large (LP)");
                      p_type = "LP";
                    }

                    console.log("Parking Area: C");
                    console.log(`Space: ${column}`);
                    console.log(`Location: ( row: ${row}, column: ${column} )`);
                    console.log(`Date: ${data[i].date}`);

                    let hours = Math.round(diff_hrs(parkDate(new Date()), parkDate(new Date(data[i].date))));
                    let payments = 0;
                    console.log("Total hours: " + diff_hrs(parkDate(new Date()), parkDate(new Date(data[i].date))).toFixed(2) + "hr/s");


                    // console.log(p_type);
                    console.log("\n--------------------------------------")
                    console.log("Total Payments:\n");
                    if (hours <= 3) {

                      // payments for the for the first 3 hours charge to 40 pesos

                      payments += 40;
                      console.log("     Initial charges (First 3 hours): " + payments);
                    }
                    else if (hours > 3 && hours <= 24) {

                      // payments for the for the first 3 hours charge to 40 pesos
                      payments += 40;
                      console.log("     Intial charges (First 3 hours): " + payments + " peso/s");

                      // another charges beyond the initial 3 hours

                      if (p_type == "SP") {
                        payments += hours * 20;
                        console.log("     Park-type(SP) charges (+20 pesos/hr): " + hours * 20 + " peso/s");

                      }
                      else if (p_type == "MP") {

                        payments += hours * 60;
                        console.log("     Park-type(MP) charges (+60 pesos/hr): " + hours * 60 + " peso/s");
                      }
                      else if (p_type == "LP") {

                        payments += hours * 100;
                        console.log("     Park-type(LP) charges (+100 pesos/hr): " + hours * 100 + " peso/s");
                      }
                    }
                    else if (hours > 24) {

                      // payments for the for the first 3 hours charge to 40 pesos

                      payments += 40;
                      let remainTime = parseInt(hours % 24);
                      payments += 5000 * parseInt(hours / 24);


                      console.log("     Initial charges (First 3 hours): " + 40 + " peso/s");
                      console.log("     full 24hours charges (+5000 pesos/24hr): " + 5000 * parseInt(hours / 24) + " peso/s");




                      if (p_type == "SP") {
                        payments += remainTime * 20;
                        console.log("     Park-type(SP) charges (+20 pesos/hr): " + remainTime * 20 + " peso/s");

                      }
                      else if (p_type == "MP") {

                        payments += remainTime * 60;
                        console.log("     Park-type(MP) charges (+60 pesos/hr): " + remainTime * 60 + " peso/s");
                      }
                      else if (p_type == "LP") {

                        payments += remainTime * 100;
                        console.log("     Park-type(LP) charges (+100 pesos/hr): " + remainTime * 100 + " peso/s");
                      }
                    }

                    console.log("     Overall Total: " + payments + " peso/s");
                    console.log("\n--------------------------------------")

                    cej.question(
                      "Unpark? [Yes or No]: ",
                      function (c) {

                        if (c.toLowerCase() == "yes") {
                          console.log("vehicle unpark sucessfully!");
                          data.splice(i, 1);
                          rsi.writeFileSync(
                            "./dataStorage.json",
                            JSON.stringify(data, null, 4)
                          );
                          rsi.writeFileSync(
                            "./pslot.json",
                            JSON.stringify(ve_data, null, 4)
                          );
                        } else if (c.toLowerCase() == "no") {
                          // go back
                        }
                        else {
                          console.log("Invalid type occurred!");
                        }


                      });


                  }

                }
              }
              else {
                console.log("Something's wrong, try again! ");
              }
            }

          }
          catch (err) {
            console.log("Something's wrong, try again! " + err.message);
          }

        }
      );
      break;
    case "m":
      delete require.cache[require.resolve("./pslot.json")];
      data = require("./pslot.json");
      console.log(
        util.inspect(ve_data, {
          showHidden: false,
          colors: true,
          compact: true,
          depth: null,
        })
      );

      break;
    default:
      break;
  }
  cej.prompt();
}).on("close", () => {
  console.log(
    "\nThank you for parking. XYZ company is happy to serve you!"
  );
  process.exit(0);
});

//Hours_Difference
function diff_hrs(dt2, dt1) {
  var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60 * 60;
  return diff;
}

//Date_Function
function parkDate(d) {
  const mnth = d.toLocaleString("default", { month: "long" });
  const date = d.getDate();
  const year = d.getFullYear();
  const hour = d.getHours();
  const mins = d.getMinutes();
  const sec = d.getSeconds();
  const da = `${mnth} ${date}, ${year} ${hour}:${mins}:${sec}`;
  return new Date(da);
}

//Function of Fulldate

function fDate(d) {
  const month = d.toLocaleString("default", { month: "long" });
  const date = d.getDate();
  const year = d.getFullYear();
  const hour = d.getHours();
  const mins = d.getMinutes();
  const sec = d.getSeconds();
  const da = `${month} ${date}, ${year} ${hour}:${mins}:${sec}`;
  return da;
}
