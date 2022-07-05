import uploadImage from "@/modules/daybook/helpers/uploadImage";
import axios from "axios";
import "setimmediate";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "dhxgse865",
  api_key: "758392877122431",
  api_secret: "VliYy1kcMhQidzQ6VCWxr_1KRpI",
});

describe("Pruebas en el uploadImage", () => {
  test("debe de cargar un archivo y retornar el url", async (done) => {
    const { data } = await axios.get(
      "https://res.cloudinary.com/dhxgse865/image/upload/v1651630561/gm7x2x2atteoiflxo4fd.jpg",
      {
        responseType: "arraybuffer",
      }
    );

    const file = new File([data], "foto.jpg");
    //console.log(file);

    const url = await uploadImage(file);

    expect(typeof url).toBe("string");

    //Tomar el ID
    //console.log(url);
    const segments = url.split("/");
    const imageId = segments[segments.length - 1].replace(".jpg", "");
    cloudinary.v2.api.delete_resources(imageId, {}, () => {
      done();
    });
  });
});
