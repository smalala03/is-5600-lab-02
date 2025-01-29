/* add your code here */
document.addEventListener("DOMContentLoaded", () => {
    // function will go here
    const stocksData = JSON.parse(stockContent);
    const userData = JSON.parse(userContent);

    console.log({ userData });
    console.log({ stocksData });

    generateUserList(userData, stocksData);

    const deleteButton = document.querySelector("#btnDelete");
    const saveButton = document.querySelector("#btnSave");

    // Register the event listener on the delete button
    deleteButton.addEventListener("click", (event) => {
      event.preventDefault();

      //find the index of the user in the data array
      const userId = document.querySelector("#userID").value;
      const userIndex = userData.findIndex((user) => user.id == userId);
      //remove the user from the data array
      userData.splice(userIndex, 1);
      // render the user list
      generateUserList(userData, stocksData);
    });

    // Register the event listener on the save button
    saveButton.addEventListener("click", (event) => {
      // we don't want the form to submit (since we will lose form state)
      event.preventDefault();
      // find the user object in our data
      const id = document.querySelector("#userID").value;
      for (let i = 0; i < userData.length; i++) {
        // found relevant user, so update object at this index and redisplay
        if (userData[i].id == id) {
          userData[i].user.firstname = document.querySelector("#firstname").value;
          userData[i].user.lastname = document.querySelector("#lastname").value;
          userData[i].user.address = document.querySelector("#address").value;
          userData[i].user.city = document.querySelector("#city").value;
          userData[i].user.email = document.querySelector("#email").value;
          generateUserList(userData, stocksData);
        }
      }
    });
  });

  /**
   * Loops through the users and renders a ul with li elements for each user
   * @param {*} users
   */
  function generateUserList(users, stocks) {
    // get the list element and for each user create a list item and append it to the list
    const userList = document.querySelector(".user-list");
    userList.innerHTML = "";

    users.map(({ user, id }) => {
      const listItem = document.createElement("li");
      listItem.innerText = user.lastname + ", " + user.firstname;
      listItem.setAttribute("id", id);
      userList.appendChild(listItem);
    });
    userList.addEventListener("click", (event) =>
      handleUserListClick(event, users, stocks),
    );
  }

  /*
   * Handles the click event on the user list
   * @param {*} event
   */
  function handleUserListClick(event, users, stocks) {
    // get the user id from the list item
    const userId = event.target.id;
    // find the user in the userData array
    // we use a "truthy" comparison here because the user id is a number and the event target id is a string
    const user = users.find((user) => user.id == userId);
    //console.log({user});
    // populate the form with the user's data
    populateForm(user);
    renderPortfolio(user, stocks);
  }

  /**
   * Populates the form with the user's data
   * @param {*} user
   */
  function populateForm(data) {
    // use destructuring to get the user and id from the data object
    const { user, id } = data;
    document.querySelector("#userID").value = id;
    document.querySelector("#firstname").value = user.firstname;
    document.querySelector("#lastname").value = user.lastname;
    document.querySelector("#address").value = user.address;
    document.querySelector("#city").value = user.city;
    document.querySelector("#email").value = user.email;
  }

  /**
   * Renders the portfolio items for the user
   * @param {*} user
   */
  function renderPortfolio(user, stocks) {
    // get the user's stock data
    const { portfolio } = user;
    // get the portfolio list element
    const portfolioDetails = document.querySelector(".portfolio-list");
    // clear the list from previous render
    portfolioDetails.innerHTML = "";
    // map over portfolio items and render them
    portfolio.map(({ symbol, owned }) => {
      // create a list item and append it to the list
      const symbolEl = document.createElement("p");
      const sharesEl = document.createElement("p");
      const actionEl = document.createElement("button");
      symbolEl.innerText = symbol;
      sharesEl.innerText = owned;
      actionEl.innerText = "View";
      actionEl.setAttribute("id", symbol);
      portfolioDetails.appendChild(symbolEl);
      portfolioDetails.appendChild(sharesEl);
      portfolioDetails.appendChild(actionEl);
    });
    portfolioDetails.addEventListener("click", (event) => {
      // let's make sure we only handle clicks on the buttons
      if (event.target.tagName === "BUTTON") {
        viewStock(event.target.id, stocks);
      }
    });
  }

  /**
   * Renders the stock information for the symbol
   * @param {*} symbol
   */
  function viewStock(symbol, stocks) {
    // begin by hiding the stock area until a stock is viewed
    const stockArea = document.querySelector(".stock-form");
    if (stockArea) {
      // find the stock object for this symbol
      const stock = stocks.find(function (s) {
        return s.symbol == symbol;
      });
      document.querySelector("#stockName").textContent = stock.name;
      document.querySelector("#stockSector").textContent = stock.sector;
      document.querySelector("#stockIndustry").textContent = stock.subIndustry;
      document.querySelector("#stockAddress").textContent = stock.address;

      document.querySelector("#logo").src = logos/${symbol}.svg;
    }
  };
 586 changes: 586 additions & 0 deletions586  
package-lock.json
Viewed
Original file line number	Diff line number	Diff line change
@@ -0,0 +1,586 @@
{
  "name": "my-project",
  "version": "0.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "my-project",
      "version": "0.0.0",
      "devDependencies": {
        "vite": "^2.9.9"
      }
    },
    "node_modules/esbuild": {
      "version": "0.14.39",
      "resolved": "https://registry.npmjs.org/esbuild/-/esbuild-0.14.39.tgz",
      "integrity": "sha512-2kKujuzvRWYtwvNjYDY444LQIA3TyJhJIX3Yo4+qkFlDDtGlSicWgeHVJqMUP/2sSfH10PGwfsj+O2ro1m10xQ==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "bin": {
        "esbuild": "bin/esbuild"
      },
      "engines": {
        "node": ">=12"
      },
      "optionalDependencies": {
        "esbuild-android-64": "0.14.39",
        "esbuild-android-arm64": "0.14.39",
        "esbuild-darwin-64": "0.14.39",
        "esbuild-darwin-arm64": "0.14.39",
        "esbuild-freebsd-64": "0.14.39",
        "esbuild-freebsd-arm64": "0.14.39",
        "esbuild-linux-32": "0.14.39",
        "esbuild-linux-64": "0.14.39",
        "esbuild-linux-arm": "0.14.39",
        "esbuild-linux-arm64": "0.14.39",
        "esbuild-linux-mips64le": "0.14.39",
        "esbuild-linux-ppc64le": "0.14.39",
        "esbuild-linux-riscv64": "0.14.39",
        "esbuild-linux-s390x": "0.14.39",
        "esbuild-netbsd-64": "0.14.39",
        "esbuild-openbsd-64": "0.14.39",
        "esbuild-sunos-64": "0.14.39",
        "esbuild-windows-32": "0.14.39",
        "esbuild-windows-64": "0.14.39",
        "esbuild-windows-arm64": "0.14.39"
      }
    },
    "node_modules/esbuild-android-64": {
      "version": "0.14.39",
      "resolved": "https://registry.npmjs.org/esbuild-android-64/-/esbuild-android-64-0.14.39.tgz",
      "integrity": "sha512-EJOu04p9WgZk0UoKTqLId9VnIsotmI/Z98EXrKURGb3LPNunkeffqQIkjS2cAvidh+OK5uVrXaIP229zK6GvhQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/esbuild-android-arm64": {
      "version": "0.14.39",
      "resolved": "https://registry.npmjs.org/esbuild-android-arm64/-/esbuild-android-arm64-0.14.39.tgz",
      "integrity": "sha512-+twajJqO7n3MrCz9e+2lVOnFplRsaGRwsq1KL/uOy7xK7QdRSprRQcObGDeDZUZsacD5gUkk6OiHiYp6RzU3CA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/esbuild-darwin-64": {
      "version": "0.14.39",
      "resolved": "https://registry.npmjs.org/esbuild-darwin-64/-/esbuild-darwin-64-0.14.39.tgz",
      "integrity": "sha512-ImT6eUw3kcGcHoUxEcdBpi6LfTRWaV6+qf32iYYAfwOeV+XaQ/Xp5XQIBiijLeo+LpGci9M0FVec09nUw41a5g==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/esbuild-darwin-arm64": {
      "version": "0.14.39",
      "resolved": "https://registry.npmjs.org/esbuild-darwin-arm64/-/esbuild-darwin-arm64-0.14.39.tgz",
      "integrity": "sha512-/fcQ5UhE05OiT+bW5v7/up1bDsnvaRZPJxXwzXsMRrr7rZqPa85vayrD723oWMT64dhrgWeA3FIneF8yER0XTw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/esbuild-freebsd-64": {
      "version": "0.14.39",
      "resolved": "https://registry.npmjs.org/esbuild-freebsd-64/-/esbuild-freebsd-64-0.14.39.tgz",
      "integrity": "sha512-oMNH8lJI4wtgN5oxuFP7BQ22vgB/e3Tl5Woehcd6i2r6F3TszpCnNl8wo2d/KvyQ4zvLvCWAlRciumhQg88+kQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/esbuild-freebsd-arm64": {
      "version": "0.14.39",
      "resolved": "https://registry.npmjs.org/esbuild-freebsd-arm64/-/esbuild-freebsd-arm64-0.14.39.tgz",
      "integrity": "sha512-1GHK7kwk57ukY2yI4ILWKJXaxfr+8HcM/r/JKCGCPziIVlL+Wi7RbJ2OzMcTKZ1HpvEqCTBT/J6cO4ZEwW4Ypg==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/esbuild-linux-32": {
      "version": "0.14.39",
      "resolved": "https://registry.npmjs.org/esbuild-linux-32/-/esbuild-linux-32-0.14.39.tgz",
      "integrity": "sha512-g97Sbb6g4zfRLIxHgW2pc393DjnkTRMeq3N1rmjDUABxpx8SjocK4jLen+/mq55G46eE2TA0MkJ4R3SpKMu7dg==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/esbuild-linux-64": {
      "version": "0.14.39",
      "resolved": "https://registry.npmjs.org/esbuild-linux-64/-/esbuild-linux-64-0.14.39.tgz",
      "integrity": "sha512-4tcgFDYWdI+UbNMGlua9u1Zhu0N5R6u9tl5WOM8aVnNX143JZoBZLpCuUr5lCKhnD0SCO+5gUyMfupGrHtfggQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/esbuild-linux-arm": {
      "version": "0.14.39",
      "resolved": "https://registry.npmjs.org/esbuild-linux-arm/-/esbuild-linux-arm-0.14.39.tgz",
      "integrity": "sha512-t0Hn1kWVx5UpCzAJkKRfHeYOLyFnXwYynIkK54/h3tbMweGI7dj400D1k0Vvtj2u1P+JTRT9tx3AjtLEMmfVBQ==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/esbuild-linux-arm64": {
      "version": "0.14.39",
      "resolved": "https://registry.npmjs.org/esbuild-linux-arm64/-/esbuild-linux-arm64-0.14.39.tgz",
      "integrity": "sha512-23pc8MlD2D6Px1mV8GMglZlKgwgNKAO8gsgsLLcXWSs9lQsCYkIlMo/2Ycfo5JrDIbLdwgP8D2vpfH2KcBqrDQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/esbuild-linux-mips64le": {
      "version": "0.14.39",
      "resolved": "https://registry.npmjs.org/esbuild-linux-mips64le/-/esbuild-linux-mips64le-0.14.39.tgz",
      "integrity": "sha512-epwlYgVdbmkuRr5n4es3B+yDI0I2e/nxhKejT9H0OLxFAlMkeQZxSpxATpDc9m8NqRci6Kwyb/SfmD1koG2Zuw==",
      "cpu": [
        "mips64el"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/esbuild-linux-ppc64le": {
      "version": "0.14.39",
      "resolved": "https://registry.npmjs.org/esbuild-linux-ppc64le/-/esbuild-linux-ppc64le-0.14.39.tgz",
      "integrity": "sha512-W/5ezaq+rQiQBThIjLMNjsuhPHg+ApVAdTz2LvcuesZFMsJoQAW2hutoyg47XxpWi7aEjJGrkS26qCJKhRn3QQ==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/esbuild-linux-riscv64": {
      "version": "0.14.39",
      "resolved": "https://registry.npmjs.org/esbuild-linux-riscv64/-/esbuild-linux-riscv64-0.14.39.tgz",
      "integrity": "sha512-IS48xeokcCTKeQIOke2O0t9t14HPvwnZcy+5baG13Z1wxs9ZrC5ig5ypEQQh4QMKxURD5TpCLHw2W42CLuVZaA==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/esbuild-linux-s390x": {
      "version": "0.14.39",
      "resolved": "https://registry.npmjs.org/esbuild-linux-s390x/-/esbuild-linux-s390x-0.14.39.tgz",
      "integrity": "sha512-zEfunpqR8sMomqXhNTFEKDs+ik7HC01m3M60MsEjZOqaywHu5e5682fMsqOlZbesEAAaO9aAtRBsU7CHnSZWyA==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/esbuild-netbsd-64": {
      "version": "0.14.39",
      "resolved": "https://registry.npmjs.org/esbuild-netbsd-64/-/esbuild-netbsd-64-0.14.39.tgz",
      "integrity": "sha512-Uo2suJBSIlrZCe4E0k75VDIFJWfZy+bOV6ih3T4MVMRJh1lHJ2UyGoaX4bOxomYN3t+IakHPyEoln1+qJ1qYaA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "netbsd"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/esbuild-openbsd-64": {
      "version": "0.14.39",
      "resolved": "https://registry.npmjs.org/esbuild-openbsd-64/-/esbuild-openbsd-64-0.14.39.tgz",
      "integrity": "sha512-secQU+EpgUPpYjJe3OecoeGKVvRMLeKUxSMGHnK+aK5uQM3n1FPXNJzyz1LHFOo0WOyw+uoCxBYdM4O10oaCAA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/esbuild-sunos-64": {
      "version": "0.14.39",
      "resolved": "https://registry.npmjs.org/esbuild-sunos-64/-/esbuild-sunos-64-0.14.39.tgz",
      "integrity": "sha512-qHq0t5gePEDm2nqZLb+35p/qkaXVS7oIe32R0ECh2HOdiXXkj/1uQI9IRogGqKkK+QjDG+DhwiUw7QoHur/Rwg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "sunos"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/esbuild-windows-32": {
      "version": "0.14.39",
      "resolved": "https://registry.npmjs.org/esbuild-windows-32/-/esbuild-windows-32-0.14.39.tgz",
      "integrity": "sha512-XPjwp2OgtEX0JnOlTgT6E5txbRp6Uw54Isorm3CwOtloJazeIWXuiwK0ONJBVb/CGbiCpS7iP2UahGgd2p1x+Q==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/esbuild-windows-64": {
      "version": "0.14.39",
      "resolved": "https://registry.npmjs.org/esbuild-windows-64/-/esbuild-windows-64-0.14.39.tgz",
      "integrity": "sha512-E2wm+5FwCcLpKsBHRw28bSYQw0Ikxb7zIMxw3OPAkiaQhLVr3dnVO8DofmbWhhf6b97bWzg37iSZ45ZDpLw7Ow==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/esbuild-windows-arm64": {
      "version": "0.14.39",
      "resolved": "https://registry.npmjs.org/esbuild-windows-arm64/-/esbuild-windows-arm64-0.14.39.tgz",
      "integrity": "sha512-sBZQz5D+Gd0EQ09tZRnz/PpVdLwvp/ufMtJ1iDFYddDaPpZXKqPyaxfYBLs3ueiaksQ26GGa7sci0OqFzNs7KA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/fsevents": {
      "version": "2.3.2",
      "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.2.tgz",
      "integrity": "sha512-xiqMQR4xAeHTuB9uWm+fFRcIOgKBMiOBP+eXiyT7jsgVCq1bkVygt00oASowB7EdtpOHaaPgKt812P9ab+DDKA==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^8.16.0 || ^10.6.0 || >=11.0.0"
      }
    },
    "node_modules/function-bind": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/function-bind/-/function-bind-1.1.1.tgz",
      "integrity": "sha512-yIovAzMX49sF8Yl58fSCWJ5svSLuaibPxXQJFLmBObTuCr0Mf1KiPopGM9NiFjiYBCbfaa2Fh6breQ6ANVTI0A==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/has": {
      "version": "1.0.3",
      "resolved": "https://registry.npmjs.org/has/-/has-1.0.3.tgz",
      "integrity": "sha512-f2dvO0VU6Oej7RkWJGrehjbzMAjFp5/VKPp5tTpWIV4JHHZK1/BxbFRtf/siA2SWTe09caDmVtYYzWEIbBS4zw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "function-bind": "^1.1.1"
      },
      "engines": {
        "node": ">= 0.4.0"
      }
    },
    "node_modules/is-core-module": {
      "version": "2.9.0",
      "resolved": "https://registry.npmjs.org/is-core-module/-/is-core-module-2.9.0.tgz",
      "integrity": "sha512-+5FPy5PnwmO3lvfMb0AsoPaBG+5KHUI0wYFXOtYPnVVVspTFUuMZNfNaNVRt3FZadstu2c8x23vykRW/NBoU6A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "has": "^1.0.3"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/nanoid": {
      "version": "3.3.4",
      "resolved": "https://registry.npmjs.org/nanoid/-/nanoid-3.3.4.tgz",
      "integrity": "sha512-MqBkQh/OHTS2egovRtLk45wEyNXwF+cokD+1YPf9u5VfJiRdAiRwB2froX5Co9Rh20xs4siNPm8naNotSD6RBw==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "nanoid": "bin/nanoid.cjs"
      },
      "engines": {
        "node": "^10 || ^12 || ^13.7 || ^14 || >=15.0.1"
      }
    },
    "node_modules/path-parse": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/path-parse/-/path-parse-1.0.7.tgz",
      "integrity": "sha512-LDJzPVEEEPR+y48z93A0Ed0yXb8pAByGWo/k5YYdYgpY2/2EsOsksJrq7lOHxryrVOn1ejG6oAp8ahvOIQD8sw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/picocolors": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/picocolors/-/picocolors-1.0.0.tgz",
      "integrity": "sha512-1fygroTLlHu66zi26VoTDv8yRgm0Fccecssto+MhsZ0D/DGW2sm8E8AjW7NU5VVTRt5GxbeZ5qBuJr+HyLYkjQ==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/postcss": {
      "version": "8.4.13",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.4.13.tgz",
      "integrity": "sha512-jtL6eTBrza5MPzy8oJLFuUscHDXTV5KcLlqAWHl5q5WYRfnNRGSmOZmOZ1T6Gy7A99mOZfqungmZMpMmCVJ8ZA==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/postcss"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "nanoid": "^3.3.3",
        "picocolors": "^1.0.0",
        "source-map-js": "^1.0.2"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      }
    },
    "node_modules/resolve": {
      "version": "1.22.0",
      "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.22.0.tgz",
      "integrity": "sha512-Hhtrw0nLeSrFQ7phPp4OOcVjLPIeMnRlr5mcnVuMe7M/7eBn98A3hmFRLoFo3DLZkivSYwhRUJTyPyWAk56WLw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-core-module": "^2.8.1",
        "path-parse": "^1.0.7",
        "supports-preserve-symlinks-flag": "^1.0.0"
      },
      "bin": {
        "resolve": "bin/resolve"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/rollup": {
      "version": "2.73.0",
      "resolved": "https://registry.npmjs.org/rollup/-/rollup-2.73.0.tgz",
      "integrity": "sha512-h/UngC3S4Zt28mB3g0+2YCMegT5yoftnQplwzPqGZcKvlld5e+kT/QRmJiL+qxGyZKOYpgirWGdLyEO1b0dpLQ==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "rollup": "dist/bin/rollup"
      },
      "engines": {
        "node": ">=10.0.0"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.2"
      }
    },
    "node_modules/source-map-js": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/source-map-js/-/source-map-js-1.0.2.tgz",
      "integrity": "sha512-R0XvVJ9WusLiqTCEiGCmICCMplcCkIwwR11mOSD9CR5u+IXYdiseeEuXCVAjS54zqwkLcPNnmU4OeJ6tUrWhDw==",
      "dev": true,
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/supports-preserve-symlinks-flag": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/supports-preserve-symlinks-flag/-/supports-preserve-symlinks-flag-1.0.0.tgz",
      "integrity": "sha512-ot0WnXS9fgdkgIcePe6RHNk1WA8+muPa6cSjeR3V8K27q9BB1rTE3R1p7Hv0z1ZyAc8s6Vvv8DIyWf681MAt0w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/vite": {
      "version": "2.9.9",
      "resolved": "https://registry.npmjs.org/vite/-/vite-2.9.9.tgz",
      "integrity": "sha512-ffaam+NgHfbEmfw/Vuh6BHKKlI/XIAhxE5QSS7gFLIngxg171mg1P3a4LSRME0z2ZU1ScxoKzphkipcYwSD5Ew==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "esbuild": "^0.14.27",
        "postcss": "^8.4.13",
        "resolve": "^1.22.0",
        "rollup": "^2.59.0"
      },
      "bin": {
        "vite": "bin/vite.js"
      },
      "engines": {
        "node": ">=12.2.0"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.2"
      },
      "peerDependencies": {
        "less": "*",
        "sass": "*",
        "stylus": "*"
      },
      "peerDependenciesMeta": {
        "less": {
          "optional": true
        },
        "sass": {
          "optional": true
        },
        "stylus": {
          "optional": true
        }
      }
    }
  }
}

