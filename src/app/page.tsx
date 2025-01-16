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

const TeachersPage: NextPage = () => {
  // 全先生データ
  const teachers: TeacherInfo[] = [
    {
      id: 1,
      name: '山田 太郎',
      nameKana: 'やまだ たろう',
      subject: '数学',
      profile:
        '10年以上の指導経験を持ち、数多くの生徒の成績アップを支えてきました。わかりやすく丁寧な解説がモットーです。',
      imageUrl: '/images/teacher1.jpg',
      schedule: [
        { day: '月曜日', time: '10:00 - 12:00', classroom: 'A教室' },
        { day: '水曜日', time: '14:00 - 16:00', classroom: 'B教室' },
      ],
    },
    {
      id: 2,
      name: '佐藤 花子',
      nameKana: 'さとう はなこ',
      subject: '英語',
      profile:
        '留学経験を活かし、実践的な英語力を養うことを得意としています。個々のレベルに合わせた指導を心がけています。',
      imageUrl: '/images/teacher2.jpg',
      schedule: [
        { day: '火曜日', time: '9:00 - 11:00', classroom: 'A教室' },
        { day: '木曜日', time: '13:00 - 15:00', classroom: 'C教室' },
      ],
    },
    {
      id: 3,
      name: '田中 一郎',
      subject: '数学',
      profile:
        '大学時代から個別指導塾で多数の生徒を指導。苦手意識を克服できるよう、面白さを伝えることを大切にしています。',
      imageUrl: '/images/teacher3.jpg',
      schedule: [
        { day: '月曜日', time: '9:00 - 10:00', classroom: 'C教室' },
        { day: '火曜日', time: '16:00 - 18:00', classroom: 'B教室' },
      ],
    },
    {
      id: 4,
      name: '鈴木 三郎',
      nameKana: 'すずき さぶろう',
      subject: '国語',
      profile:
        '読み書きの基礎から応用まで幅広い指導が可能。生徒の興味を引き出しながら、言葉の力を育みます。',
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
        <title>先生一覧 - 教室付きスケジュール</title>
        <meta
          name="description"
          content="先生を名前やフリガナで検索して、曜日ごとのスケジュール（教室情報つき）を表示します。"
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
                      <th style={styles.tableHeader}>曜日</th>
                      <th style={styles.tableHeader}>時間</th>
                      <th style={styles.tableHeader}>教室</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedTeacher.schedule
                      .filter((slot) => slot.day === currentDay)
                      .map((slot, index) => (
                        <tr key={index}>
                          <td style={styles.tableCell}>{slot.day}</td>
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
