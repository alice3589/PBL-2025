// pages/teachers.tsx
"use client";

import { NextPage } from 'next';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';

type ScheduleSlot = {
  day: string;       // "月曜日" 等、日本語表記
  time: string;      // "10:00 - 12:00" 等
  classroom: string; // "A教室" 等
};

type TeacherInfo = {
  id: number;
  name: string;
  nameKana?: string;
  subject: string;
  profile: string;
  imageUrl: string;
  schedule: ScheduleSlot[]; // 教室情報を含む
};

function getPeriodLabel(time: string): string {
  if (time === "9:30 - 10:15") return "1限";
  if (time === "10:20 - 11:05") return "2限";
  if (time === "11:10 - 11:55") return "3限";
  if (time === "12:00 - 12:45") return "4限a";
  if (time === "12:40 - 13:25") return "4限b";
  if (time === "13:30 - 14:15") return "5限";
  if (time === "14:20 - 15:05") return "6限";
  if (time === "15:10 - 15:55") return "7限";
  if (time === "16:00 - 16:45") return "8限";
  if (time === "16:50 - 17:35") return "9限";
  if (time === "17:40 - 18:25") return "10限";
  return "不明";
}

const TeachersPage: NextPage = () => {
  // 全先生データ
  const teachers: TeacherInfo[] = [
    {
      id: 1,
      name: '大内 清司',
      nameKana: 'おおうち せいじ',
      subject: '国語',
      profile:
        '特任教授 文学修士',
      imageUrl: '/images/teacher1.jpg',
      schedule: [
        { day: '火曜日', time: '11:10 - 11:55', classroom: '214教室' },
      ],
    },
    {
      id: 2,
      name: '山本 空',
      nameKana: 'やまもと そら',
      subject: '国語',
      profile:
        '講師 博士(文学)',
      imageUrl: '/images/teacher2.jpg',
      schedule: [
        { day: '火曜日', time: '9:30 - 10:15', classroom: '222教室' },
        { day: '火曜日', time: '10:20 - 11:05', classroom: '312教室' },
        { day: '火曜日', time: '14:20 - 15:05', classroom: '221教室' },
      ],
    },
    {
      id: 3,
      name: '上田 透',
      nameKana: 'うえだ とおる',
      subject: '英語',
      profile:
        '准教授 文学修士',
      imageUrl: '/images/teacher3.jpg',
      schedule: [

      ],
    },
    {
      id: 4,
      name: '藤本 時子',
      nameKana: 'ふじもと ときこ',
      subject: '英語',
      profile:
        '准教授 博士(外国語文献学)',
      imageUrl: '/images/teacher3.jpg',
      schedule: [
        { day: '火曜日', time: '9:30 - 10:15', classroom: '312教室' },
        { day: '火曜日', time: '10:20 - 11:05', classroom: '223教室' },
      ],
    },
    {
      id: 5,
      name: '奈須 健',
      nameKana: 'なす けん',
      subject: '英語',
      profile:
        '准教授 修士(国際公共政策)',
      imageUrl: '/images/teacher3.jpg',
      schedule: [
        { day: '火曜日', time: '10:20 - 11:05', classroom: '222教室' },
        { day: '火曜日', time: '12:00 - 12:45', classroom: '211教室' },
      ],
    },
    {
      id: 6,
      name: 'ﾉｳﾞｧｼｮｰﾗｳﾞｧ ｲﾘｰﾅ',
      nameKana: 'のゔぁしょーらゔぁ・いリーな',
      subject: '英語',
      profile:
        '講師 博士(文学)',
      imageUrl: '/images/teacher3.jpg',
      schedule: [
        { day: '火曜日', time: '9:30 - 10:15', classroom: '032教室' },
        { day: '火曜日', time: '10:20 - 11:05', classroom: '221教室' },
        { day: '火曜日', time: '12:00 - 12:45', classroom: '212教室' },
      ],
    },
    {
      id: 7,
      name: '伊藤 豊治',
      nameKana: 'いとう とよはる',
      subject: '数学',
      profile:
        '教授 博士(数理学)',
      imageUrl: '/images/teacher3.jpg',
      schedule: [
        { day: '火曜日', time: '11:10 - 11:55', classroom: '222教室' },
        { day: '火曜日', time: '12:00 - 12:45', classroom: '222教室' },
        { day: '火曜日', time: '15:10 - 15:55', classroom: '222教室' },
        { day: '火曜日', time: '16:50 - 17:35', classroom: '034教室' },
        { day: '火曜日', time: '17:40 - 18:25', classroom: '034教室' },
      ],
    },
    {
      id: 8,
      name: '神田 毅',
      nameKana: 'かんだ たけし',
      subject: '数学',
      profile:
        '准教授 博士(工学)',
      imageUrl: '/images/teacher3.jpg',
      schedule: [
        { day: '火曜日', time: '13:30 - 14:15', classroom: '224教室' },
        { day: '火曜日', time: '14:20 - 15:05', classroom: '224教室' },
        { day: '火曜日', time: '15:10 - 15:55', classroom: '314教室' },
        { day: '火曜日', time: '16:00 - 16:45', classroom: '224教室' },
      ],
    },
    {
      id: 9,
      name: '鍬田 英也',
      nameKana: 'くわた ひでや',
      subject: '数学',
      profile:
        '講師 博士(理学)',
      imageUrl: '/images/teacher3.jpg',
      schedule: [
        { day: '火曜日', time: '11:10 - 11:55', classroom: '223教室' },
        { day: '火曜日', time: '12:00 - 12:45', classroom: '223教室' },
        { day: '火曜日', time: '13:30 - 14:15', classroom: '214教室' },
        { day: '火曜日', time: '14:20 - 15:05', classroom: '214教室' },
      ],
    },
    {
      id: 10,
      name: '谷口 寛',
      nameKana: 'たにぐち ゆたか',
      subject: '数学',
      profile:
        '助教 修士(教育学)',
      imageUrl: '/images/teacher3.jpg',
      schedule: [
        { day: '火曜日', time: '11:10 - 11:55', classroom: '314教室' },
        { day: '火曜日', time: '12:00 - 12:45', classroom: '314教室' },
        { day: '火曜日', time: '13:30 - 14:15', classroom: '212教室' },
        { day: '火曜日', time: '14:20 - 15:05', classroom: '212教室' },
        { day: '火曜日', time: '15:10 - 15:55', classroom: '223教室' },
      ],
    },
    {
      id: 11,
      name: '今野 理喜男',
      nameKana: 'こんの りきお',
      subject: '理科',
      profile:
        '教授 博士(理学)',
      imageUrl: '/images/teacher3.jpg',
      schedule: [
        { day: '火曜日', time: '11:10 - 11:55', classroom: 'S2教室' },
        { day: '火曜日', time: '12:00 - 12:45', classroom: 'S2教室' },
      ],
    },
    {
      id: 12,
      name: '鈴木 隆',
      nameKana: 'すずき たかし',
      subject: '理科',
      profile:
        '教授 博士(理学)',
      imageUrl: '/images/teacher3.jpg',
      schedule: [
        { day: '火曜日', time: '9:30 - 10:15', classroom: '221教室' },
        { day: '火曜日', time: '13:30 - 14:15', classroom: '222教室' },
      ],
    },
    {
      id: 13,
      name: '畑山 伸訓',
      nameKana: 'はたやま のぶくに',
      subject: '理科',
      profile:
        '准教授 修士(理学)',
      imageUrl: '/images/teacher3.jpg',
      schedule: [
        { day: '火曜日', time: '9:30 - 10:15', classroom: '314教室' },
        { day: '火曜日', time: '13:30 - 14:15', classroom: '312教室' },
        { day: '火曜日', time: '14:20 - 15:05', classroom: '312教室' },
      ],
    },
    {
      id: 14,
      name: '坂東 将光',
      nameKana: 'ばんどう まさみつ',
      subject: '理科',
      profile:
        '准教授 博士(理学)',
      imageUrl: '/images/teacher3.jpg',
      schedule: [
        { day: '火曜日', time: '9:30 - 10:15', classroom: 'CAI室' },
        { day: '火曜日', time: '10:20 - 11:05', classroom: 'CAI教室' },
        { day: '火曜日', time: '15:10 - 15:55', classroom: 'CAI教室' },
        { day: '火曜日', time: '16:00 - 16:45', classroom: 'CAI教室' },
      ],
    },
    {
      id: 15,
      name: '松尾 大介',
      nameKana: 'まつお だいすけ',
      subject: '社会',
      profile:
        '教授',
      imageUrl: '/images/teacher3.jpg',
      schedule: [
    
      ],
    },
    {
      id: 16,
      name: '辻本 修',
      nameKana: 'つじもと おさむ',
      subject: '保健体育',
      profile:
        '特任教授',
      imageUrl: '/images/teacher3.jpg',
      schedule: [
        { day: '火曜日', time: '9:30 - 10:15', classroom: '教室またはグラウンド' },
        { day: '火曜日', time: '10:20 - 11:05', classroom: '教室またはグラウンド' },
      ],
    },
    {
      id: 17,
      name: '齊藤 彰',
      nameKana: 'さいとう あきら',
      subject: '保健体育',
      profile:
        '教授',
      imageUrl: '/images/teacher3.jpg',
      schedule: [
        { day: '火曜日', time: '9:30 - 10:15', classroom: '教室またはグラウンド' },
        { day: '火曜日', time: '10:20 - 11:05', classroom: '教室またはグラウンド' },
        { day: '火曜日', time: '13:30 - 14:15', classroom: '教室またはグラウンド' },
        { day: '火曜日', time: '14:20 - 15:05', classroom: '教室またはグラウンド' },
        { day: '火曜日', time: '15:10 - 15:55', classroom: '教室またはグラウンド' },
        { day: '火曜日', time: '16:00 - 16:45', classroom: '教室またはグラウンド' },
      ],
    },
    {
      id: 18,
      name: '荒賀 浩一',
      nameKana: 'あらが こういち',
      subject: '機械システムコース',
      profile:
        '教授 博士(工学)',
      imageUrl: '/images/teacher3.jpg',
      schedule: [
        { day: '火曜日', time: '11:10 - 11:55', classroom: '022教室' },
      ],
    },
    {
      id: 19,
      name: '瀧浦 晃基',
      nameKana: 'たきうら こうき',
      subject: '機械システムコース',
      profile:
        '教授 博士(工学)',
      imageUrl: '/images/teacher3.jpg',
      schedule: [
        
      ],
    },
    {
      id: 20,
      name: '中村 信広',
      nameKana: 'なかむら のぶひろ',
      subject: '機械システムコース',
      profile:
        '准教授 博士(工学)',
      imageUrl: '/images/teacher3.jpg',
      schedule: [
        { day: '火曜日', time: '15:10 - 15:55', classroom: '034教室' },
        { day: '火曜日', time: '16:00 - 16:45', classroom: '034教室' },
      ],
    },
    {
      id: 21,
      name: '長谷川 尚哉',
      nameKana: 'はせがわ なおや',
      subject: '機械システムコース',
      profile:
        '准教授 博士(工学)',
      imageUrl: '/images/teacher3.jpg',
      schedule: [
        { day: '金曜日', time: '10:00 - 12:00', classroom: 'A教室' },
        { day: '金曜日', time: '14:00 - 16:00', classroom: 'B教室' },
      ],
    },
    {
      id: 22,
      name: '木岡 桂太郎',
      nameKana: 'きおか けいたろう',
      subject: '機械システムコース',
      profile:
        '講師 博士(工学)',
      imageUrl: '/images/teacher3.jpg',
      schedule: [
        { day: '金曜日', time: '10:00 - 12:00', classroom: 'A教室' },
        { day: '金曜日', time: '14:00 - 16:00', classroom: 'B教室' },
      ],
    },
    {
      id: 23,
      name: '山川 昌文',
      nameKana: 'やまかわ まさふみ',
      subject: '電気電子コース',
      profile:
        '特任教授 博士(工学)',
      imageUrl: '/images/teacher3.jpg',
      schedule: [
        { day: '金曜日', time: '10:00 - 12:00', classroom: 'A教室' },
        { day: '金曜日', time: '14:00 - 16:00', classroom: 'B教室' },
      ],
    },
    {
      id: 24,
      name: '吉川 隆',
      nameKana: 'よしかわ たかし',
      subject: '電気電子コース',
      profile:
        '教授 博士(工学)',
      imageUrl: '/images/teacher3.jpg',
      schedule: [
        { day: '金曜日', time: '10:00 - 12:00', classroom: 'A教室' },
        { day: '金曜日', time: '14:00 - 16:00', classroom: 'B教室' },
      ],
    },
    {
      id: 25,
      name: '齊藤 公博',
      nameKana: 'さいとう きみひろ',
      subject: '電気電子コース',
      profile:
        '教授 博士(工学)',
      imageUrl: '/images/teacher3.jpg',
      schedule: [
        { day: '金曜日', time: '10:00 - 12:00', classroom: 'A教室' },
        { day: '金曜日', time: '14:00 - 16:00', classroom: 'B教室' },
      ],
    },
    {
      id: 26,
      name: '仲森 昌也',
      nameKana: 'なかもり まさや',
      subject: '電気電子コース',
      profile:
        '准教授 工学修士',
      imageUrl: '/images/teacher3.jpg',
      schedule: [
        { day: '金曜日', time: '10:00 - 12:00', classroom: 'A教室' },
        { day: '金曜日', time: '14:00 - 16:00', classroom: 'B教室' },
      ],
    },
    {
      id: 27,
      name: '小山 幸伸',
      nameKana: 'こやま ゆきのぶ',
      subject: '電気電子コース',
      profile:
        '准教授 博士(理学)',
      imageUrl: '/images/teacher3.jpg',
      schedule: [
        { day: '金曜日', time: '10:00 - 12:00', classroom: 'A教室' },
        { day: '金曜日', time: '14:00 - 16:00', classroom: 'B教室' },
      ],
    },
    {
      id: 28,
      name: '關 成之',
      nameKana: 'せき しげゆき',
      subject: '電気電子コース',
      profile:
        '准教授 博士(理学)',
      imageUrl: '/images/teacher3.jpg',
      schedule: [
        { day: '金曜日', time: '10:00 - 12:00', classroom: 'A教室' },
        { day: '金曜日', time: '14:00 - 16:00', classroom: 'B教室' },
      ],
    },
    {
      id: 29,
      name: '本田 康子',
      nameKana: 'ほんだ やすこ',
      subject: '制御情報コース',
      profile:
        '准教授 博士(理学)',
      imageUrl: '/images/teacher3.jpg',
      schedule: [
        { day: '金曜日', time: '10:00 - 12:00', classroom: 'A教室' },
        { day: '金曜日', time: '14:00 - 16:00', classroom: 'B教室' },
      ],
    },
    {
      id: 30,
      name: '舩島 洋紀',
      nameKana: 'ふなしま ひろき',
      subject: '制御情報コース',
      profile:
        '准教授 博士(理学)',
      imageUrl: '/images/teacher3.jpg',
      schedule: [
        { day: '金曜日', time: '10:00 - 12:00', classroom: 'A教室' },
        { day: '金曜日', time: '14:00 - 16:00', classroom: 'B教室' },
      ],
    },
    {
      id: 31,
      name: '黄 文敬',
      nameKana: 'ふぁん うぇんじん',
      subject: '制御情報コース',
      profile:
        '准教授 博士(医工学)',
      imageUrl: '/images/teacher3.jpg',
      schedule: [
        { day: '金曜日', time: '10:00 - 12:00', classroom: 'A教室' },
        { day: '金曜日', time: '14:00 - 16:00', classroom: 'B教室' },
      ],
    },
    {
      id: 32,
      name: '桑川 栄一',
      nameKana: 'くわかわ えいいち',
      subject: '制御情報コース',
      profile:
        '特任講師 博士(工学)',
      imageUrl: '/images/teacher3.jpg',
      schedule: [
        { day: '金曜日', time: '10:00 - 12:00', classroom: 'A教室' },
        { day: '金曜日', time: '14:00 - 16:00', classroom: 'B教室' },
      ],
    },
    {
      id: 33,
      name: '高 成柱',
      nameKana: 'こう そんじゅ',
      subject: '制御情報コース',
      profile:
        '助教',
      imageUrl: '/images/teacher3.jpg',
      schedule: [
        { day: '金曜日', time: '10:00 - 12:00', classroom: 'A教室' },
        { day: '金曜日', time: '14:00 - 16:00', classroom: 'B教室' },
      ],
    },
    {
      id: 34,
      name: '中平 恭之',
      nameKana: 'なかむら やすゆき',
      subject: '都市環境コース',
      profile:
        '教授 博士(工学)',
      imageUrl: '/images/teacher3.jpg',
      schedule: [
        { day: '金曜日', time: '10:00 - 12:00', classroom: 'A教室' },
        { day: '金曜日', time: '14:00 - 16:00', classroom: 'B教室' },
      ],
    },
    {
      id: 35,
      name: '石田 優子',
      nameKana: 'いしだ ゆうこ',
      subject: '都市環境コース',
      profile:
        '教授 博士(工学)',
      imageUrl: '/images/teacher3.jpg',
      schedule: [
        { day: '金曜日', time: '10:00 - 12:00', classroom: 'A教室' },
        { day: '金曜日', time: '14:00 - 16:00', classroom: 'B教室' },
      ],
    },
    {
      id: 36,
      name: '立神 靖久',
      nameKana: 'たつかみ やすひさ',
      subject: '都市環境コース',
      profile:
        '教授 博士(工学)',
      imageUrl: '/images/teacher3.jpg',
      schedule: [
        { day: '金曜日', time: '10:00 - 12:00', classroom: 'A教室' },
        { day: '金曜日', time: '14:00 - 16:00', classroom: 'B教室' },
      ],
    },
    {
      id: 37,
      name: '田中 和幸',
      nameKana: 'たなか かずゆき',
      subject: '都市環境コース',
      profile:
        '教授 博士(工学)',
      imageUrl: '/images/teacher3.jpg',
      schedule: [
        { day: '金曜日', time: '10:00 - 12:00', classroom: 'A教室' },
        { day: '金曜日', time: '14:00 - 16:00', classroom: 'B教室' },
      ],
    },
    {
      id: 38,
      name: '松岡 良智',
      nameKana: 'まつおか よしのり',
      subject: '都市環境コース',
      profile:
        '准教授 博士(工学)',
      imageUrl: '/images/teacher3.jpg',
      schedule: [
        { day: '金曜日', time: '10:00 - 12:00', classroom: 'A教室' },
        { day: '金曜日', time: '14:00 - 16:00', classroom: 'B教室' },
      ],
    },
    {
      id: 39,
      name: '安井 宣仁',
      nameKana: 'やすい のぶひと',
      subject: '都市環境コース',
      profile:
        '准教授 博士(工学)',
      imageUrl: '/images/teacher3.jpg',
      schedule: [
        { day: '金曜日', time: '10:00 - 12:00', classroom: 'A教室' },
        { day: '金曜日', time: '14:00 - 16:00', classroom: 'B教室' },
      ],
    },
  ];

  // 検索文字列の state
  const [searchTerm, setSearchTerm] = useState('');

  // クリックした先生を state で保持（モーダル表示用）
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherInfo | null>(null);

  // 「今日」の曜日を保持する state
  const [currentDay, setCurrentDay] = useState<string>('');

  // ページがマウントされたときに現在の曜日を設定
  useEffect(() => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0:日曜, 1:月曜, 2:火曜, ...
    const dayNames = ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'];
    setCurrentDay(dayNames[dayOfWeek]);
  }, []);

  // 入力変更時に state を更新
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // カードをクリック → モーダルを表示
  const handleTeacherClick = (teacher: TeacherInfo) => {
    setSelectedTeacher(teacher);
  };

  // モーダルを閉じる
  const handleCloseModal = () => {
    setSelectedTeacher(null);
  };

  // 小文字に正規化した検索文字列
  const normalizedSearch = searchTerm.trim().toLowerCase();

  // フィルタリング（名前 or フリガナが部分一致）
  const filteredTeachers = teachers.filter((teacher) => {
    const nameLower = teacher.name.toLowerCase();
    const nameKanaLower = teacher.nameKana?.toLowerCase() || '';
    return (
      nameLower.includes(normalizedSearch) ||
      nameKanaLower.includes(normalizedSearch)
    );
  });

  // 科目ごとにグルーピング
  const groupedTeachers = filteredTeachers.reduce((acc, teacher) => {
    if (!acc[teacher.subject]) {
      acc[teacher.subject] = [];
    }
    acc[teacher.subject].push(teacher);
    return acc;
  }, {} as Record<string, TeacherInfo[]>);

  // 科目の一覧を取得
  const subjects = Object.keys(groupedTeachers).sort();

  return (
    <>
      <Head>
        <title>先生一覧 - 何限目表示</title>
        <meta
          name="description"
          content="先生を名前やフリガナで検索し、曜日ごとの時間割を「何限目」で表示します。"
        />
      </Head>

      <main style={styles.main}>
        <h1 style={styles.title}>先生一覧</h1>

        {/* 検索ボックス */}
        <div style={styles.searchContainer}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="先生の名前やフリガナで検索"
            style={styles.searchInput}
          />
        </div>

        {/* 検索結果 */}
        {subjects.length === 0 ? (
          <p>検索結果がありません。</p>
        ) : (
          subjects.map((subject) => (
            <section key={subject} style={styles.subjectSection}>
              <h2 style={styles.subjectTitle}>{subject}</h2>
              <div style={styles.teacherContainer}>
                {groupedTeachers[subject].map((teacher) => (
                  <div
                    key={teacher.id}
                    style={styles.teacherCard}
                    onClick={() => handleTeacherClick(teacher)}
                  >
                    <img
                      src={teacher.imageUrl}
                      alt={`${teacher.name}先生`}
                      style={styles.teacherImage}
                    />
                    <h3 style={styles.teacherName}>
                      {teacher.name}先生
                      {teacher.nameKana && (
                        <span style={styles.teacherNameKana}>
                          （{teacher.nameKana}）
                        </span>
                      )}
                    </h3>
                    <p style={styles.teacherProfile}>{teacher.profile}</p>
                  </div>
                ))}
              </div>
            </section>
          ))
        )}

        {/* モーダル表示：選択された先生がいるとき */}
        {selectedTeacher && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
              <button style={styles.closeButton} onClick={handleCloseModal}>
                Ｘ
              </button>
              <h2 style={styles.modalTitle}>
                {selectedTeacher.name}先生の「{currentDay}」のスケジュール
              </h2>

              {/* 今日に該当する予定だけ表示 */}
              {selectedTeacher.schedule.filter((slot) => slot.day === currentDay)
                .length === 0 ? (
                <p>本日はスケジュールがありません。</p>
              ) : (
                <table style={styles.scheduleTable}>
                  <thead>
                    <tr>
                      {/* ★「曜日」は表示せず、代わりに「何限目」を表示 */}
                      <th style={styles.tableHeader}>何限目</th>
                      <th style={styles.tableHeader}>時間</th>
                      <th style={styles.tableHeader}>教室</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedTeacher.schedule
                      .filter((slot) => slot.day === currentDay)
                      .map((slot, index) => (
                        <tr key={index}>
                          {/* getPeriodLabel で「何限目」に変換 */}
                          <td style={styles.tableCell}>
                            {getPeriodLabel(slot.time)}
                          </td>
                          {/* 時間はそのまま表示 */}
                          <td style={styles.tableCell}>{slot.time}</td>
                          <td style={styles.tableCell}>{slot.classroom}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </main>
    </>
  );
};

// シンプルなインラインスタイル（必要に応じてCSSやTailwind CSSなどをご利用ください）
const styles: { [key: string]: React.CSSProperties } = {
  main: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem',
    position: 'relative',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  searchContainer: {
    marginBottom: '2rem',
    textAlign: 'center',
  },
  searchInput: {
    width: '80%',
    maxWidth: '400px',
    padding: '0.5rem',
    fontSize: '1rem',
  },
  subjectSection: {
    marginBottom: '2rem',
  },
  subjectTitle: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    borderBottom: '1px solid #ccc',
    paddingBottom: '0.5rem',
  },
  teacherContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  teacherCard: {
    flex: '0 0 calc(50% - 1rem)',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '1rem',
    cursor: 'pointer',
  },
  teacherImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    marginBottom: '0.5rem',
    objectFit: 'cover',
  },
  teacherName: {
    fontSize: '1.2rem',
    marginBottom: '0.25rem',
    lineHeight: 1.4,
  },
  teacherNameKana: {
    marginLeft: '0.5rem',
    fontSize: '0.9rem',
    color: '#666',
  },
  teacherProfile: {
    fontSize: '0.95rem',
    lineHeight: 1.5,
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '2rem',
    maxWidth: '500px',
    width: '90%',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'none',
    border: 'none',
    fontSize: '1.2rem',
    cursor: 'pointer',
  },
  modalTitle: {
    marginTop: 0,
    marginBottom: '1rem',
    textAlign: 'center',
  },
  scheduleTable: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    borderBottom: '2px solid #333',
    padding: '0.5rem',
    textAlign: 'left',
  },
  tableCell: {
    borderBottom: '1px solid #ccc',
    padding: '0.5rem',
  },
};

export default TeachersPage;
