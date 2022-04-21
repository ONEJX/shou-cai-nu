import recordStore from "@/store/recordStore";
import tagStore from "@/store/tagStore";

const oldstore = {
  ...recordStore,
  ...tagStore
}
export default oldstore