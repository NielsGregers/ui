import { getDbAndCollection ,DbAndCollection} from ".";

it("Test collection named col1", async () => {
  var value: DbAndCollection = await getDbAndCollection("DB",
    "col1"
  );
  console.log(value);
  
  expect(value.db).toBe("DB");
  expect(value.collection).toBe("col1");
});



it("Test collection named col1", async () => {
  var value: DbAndCollection = await getDbAndCollection("DB",
    "col2@DB2"
  );
  console.log(value);
  
  expect(value.db).toBe("DB2");
  expect(value.collection).toBe("col2");
});
