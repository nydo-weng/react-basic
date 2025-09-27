import { NavBar, DatePicker } from "antd-mobile";
import { useEffect, useState } from "react";
import "./index.scss";
import classNames from "classnames";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import _ from "lodash";

const Month = () => {
  // 按月做数据的分组
  const billList = useSelector((state) => state.bill.billList);

  const [currentMonthList, setCurrentMonthList] = useState([]);

  const monthGroup = useMemo(() => {
    // 回调函数, return 出去计算之后的值
    return _.groupBy(billList, (item) => dayjs(item.date).format("YYYY-MM"));
  }, [billList]);
  // 依赖项, 计算依赖于谁就放谁

  const monthResult = useMemo(() => {
    // 支出 / 收入 / 结余
    const pay = currentMonthList
      ?.filter((item) => item.type === "pay")
      ?.reduce((a, c) => a + c.money, 0);
    const income = currentMonthList
      ?.filter((item) => item.type === "income")
      ?.reduce((a, c) => a + c.money, 0);
    return {
      pay,
      income,
      total: pay + income,
    };
  }, [currentMonthList]);

  // 控制弹框的打开和关闭
  const [dateVisible, setDateVisbile] = useState(false);

  // 控制时间显示
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs(new Date()).format("YYYY-MM");
  });

  // 确认回调, 拿到用户选择时间, 处理后得到 XXXX-XX
  const onConfirm = (date) => {
    setDateVisbile(false);
    const formatDate = dayjs(date).format("YYYY-MM");
    // monthGroup[formatDate] 可能不存在, 用空数组兜底
    setCurrentMonthList(monthGroup[formatDate] ?? []);
    console.log("monthGroup", monthGroup, formatDate, monthGroup[formatDate]);
    setCurrentDate(formatDate);
  };

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => setDateVisbile(true)}>
            <span className="text">{currentDate + ""}月账单</span>
            {/* expand 属性控制箭头的朝向  */}
            <span
              className={classNames("arrow", dateVisible && "expand")}
            ></span>
          </div>
          {/* 统计区域 */}
          <div className="twoLineOverview">
            <div className="item">
              <span className="money">{monthResult.pay}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.income}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.total}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={dateVisible}
            // 按取消
            onCancel={() => setDateVisbile(false)}
            // 按确定, 这个会返回一个 Date 对象
            onConfirm={onConfirm}
            // 按蒙层
            onClose={() => setDateVisbile(false)}
            max={new Date()}
          />
        </div>
        {/* 单日列表统计 */}
      </div>
    </div>
  );
};

export default Month;
