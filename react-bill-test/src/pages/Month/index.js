import { NavBar, DatePicker } from "antd-mobile";
import { useEffect, useState } from "react";
import "./index.scss";
import classNames from "classnames";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import _ from "lodash";
import DailyBill from "./components/DayBill";

const Month = () => {
  // 按月做数据的分组
  const billList = useSelector((state) => state.bill.billList);

  const [currentMonthList, setCurrentMonthList] = useState([]);

  const monthGroup = useMemo(() => {
    // 回调函数, return 出去计算之后的值
    return _.groupBy(billList, (item) => dayjs(item.date).format("YYYY-MM"));
  }, [billList]);
  // 依赖项, 计算依赖于谁就放谁

  // 当前月按照日分组
  const dayGroup = useMemo(() => {
    // 回调函数, return 出去计算之后的值
    const groupData = _.groupBy(currentMonthList, (item) => dayjs(item.date).format("YYYY-MM-DD"));
    const keys = Object.keys(groupData);

    return {
      groupData,
      keys,
    };
  }, [currentMonthList]);
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

  // 初始化当前月统计信息
  useEffect(() => {
    const nowDate = dayjs().format("YYYY-MM");
    // 这里教程里也提到 undefined 问题了 边界控制是这么做的
    if (monthGroup[nowDate]) {
      setCurrentMonthList(monthGroup[nowDate]);
    }
    // setCurrentMonthList(monthGroup[nowDate] ?? []);
  }, [monthGroup]); // 这里不要忘记把 monthGroup 作为依赖项给 useEffect

  // 确认回调, 拿到用户选择时间, 处理后得到 XXXX-XX
  const onConfirm = (date) => {
    setDateVisbile(false);
    const formatDate = dayjs(date).format("YYYY-MM");
    // monthGroup[formatDate] 可能不存在, 用空数组兜底
    setCurrentMonthList(monthGroup[formatDate] ?? []);
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
            <span className={classNames("arrow", dateVisible && "expand")}></span>
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
        {dayGroup.keys.map((key) => {
          return <DailyBill key={key} date={key} billList={dayGroup.groupData[key]} />;
        })}
      </div>
    </div>
  );
};

export default Month;
