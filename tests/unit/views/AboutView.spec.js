import { shallowMount } from "@vue/test-utils";
import AboutView from "@/views/AboutView";

describe("AboutView Component", () => {
  test("debe de hacer match con el snapshot", () => {
    const wrapper = shallowMount(AboutView);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
