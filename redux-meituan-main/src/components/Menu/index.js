import classNames from "classnames";
import "./index.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { changeActiveIndex } from "../../store/modules/takeaway";

const Menu = () => {
  const { foodsList, activeIndex } = useSelector((state) => state.foods);
  const menus = foodsList.map((item) => ({ tag: item.tag, name: item.name }));
  const dispatch = useDispatch();
  return (
    <nav className="list-menu">
      {/* 添加active类名会变成激活状态 */}
      {menus.map((item, index) => {
        return (
          <div
            key={item.tag}
            // className={classNames("list-menu-item", "active")}
            className={classNames("list-menu-item", {
              active: activeIndex === index,
            })}
            onClick={() => {
              dispatch(changeActiveIndex(index));
              console.log(activeIndex);
            }}
          >
            {item.name}
          </div>
        );
      })}
    </nav>
  );
};

export default Menu;
