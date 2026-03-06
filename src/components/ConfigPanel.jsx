import { useState, useEffect } from 'react';
import { ModuleCard } from './ModuleCard';
import { IndustrialButton } from './IndustrialButton';
import { DEFAULT_QUESTIONS } from '../constants/defaultQuestions';

export const ConfigPanel = ({ onStart, initialRounds = 10, initialQuestions = [] }) => {
  const [rounds, setRounds] = useState(initialRounds);
  const [showQuestions, setShowQuestions] = useState(false);
  const [questions, setQuestions] = useState(initialQuestions);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ content: '', category: '言语' });

  const handleStart = () => {
    if (questions.length === 0) {
      alert('请至少输入一个挑战任务！');
      return;
    }

    onStart(rounds, questions);
  };

  const handleResetQuestions = () => {
    if (confirm('确定要重置为默认题库吗？这会删除所有自定义题目。')) {
      setQuestions(DEFAULT_QUESTIONS);
    }
  };

  const handleShuffleQuestions = () => {
    const shuffled = [...questions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setQuestions(shuffled);
  };

  const handleAddQuestion = () => {
    if (!formData.content.trim()) {
      alert('请输入题目内容！');
      return;
    }

    const newQuestion = {
      id: Date.now(),
      content: formData.content.trim(),
      category: formData.category,
      isCustom: true
    };

    setQuestions([...questions, newQuestion]);
    setFormData({ content: '', category: '言语' });
    setShowAddForm(false);
  };

  const handleEditQuestion = (question) => {
    setEditingId(question.id);
    setFormData({ content: question.content, category: question.category });
    setShowAddForm(true);
  };

  const handleUpdateQuestion = () => {
    if (!formData.content.trim()) {
      alert('请输入题目内容！');
      return;
    }

    setQuestions(questions.map(q =>
      q.id === editingId
        ? { ...q, content: formData.content.trim(), category: formData.category }
        : q
    ));
    setFormData({ content: '', category: '言语' });
    setShowAddForm(false);
    setEditingId(null);
  };

  const handleDeleteQuestion = (id) => {
    if (confirm('确定要删除这个题目吗？')) {
      setQuestions(questions.filter(q => q.id !== id));
    }
  };

  const handleCancelForm = () => {
    setShowAddForm(false);
    setEditingId(null);
    setFormData({ content: '', category: '言语' });
  };

  const questionCount = questions.length;

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-4">
      <ModuleCard moduleId="CONFIG" name="GAME SETUP">
        <div className="space-y-4">
          <div>
            <label className="block font-mono text-sm text-text-secondary mb-2 uppercase">
              Total Rounds
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={rounds}
              onChange={(e) => setRounds(parseInt(e.target.value) || 1)}
              className="w-full bg-bg border border-border text-text-primary font-mono px-3 py-2 focus:border-accent focus:outline-none"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block font-mono text-sm text-text-secondary uppercase">
                Question Bank ({questionCount} questions)
              </label>
              <IndustrialButton
                onClick={() => setShowQuestions(!showQuestions)}
                className="text-xs px-2 py-1 min-h-[32px]"
              >
                {showQuestions ? '隐藏' : '查看'}
              </IndustrialButton>
            </div>

            {showQuestions && (
              <div className="space-y-2">
                {/* 添加/编辑表单 */}
                {showAddForm && (
                  <div className="bg-bg border border-accent p-3 space-y-2">
                    <div className="font-mono text-xs text-accent uppercase">
                      {editingId ? '编辑题目' : '添加新题目'}
                    </div>
                    <input
                      type="text"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="输入题目内容..."
                      className="w-full bg-surface border border-border text-text-primary font-mono text-sm px-2 py-1 focus:border-accent focus:outline-none"
                    />
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-surface border border-border text-text-primary font-mono text-sm px-2 py-1 focus:border-accent focus:outline-none"
                    >
                      <option value="言语">言语</option>
                      <option value="动作">动作</option>
                      <option value="话题">话题</option>
                    </select>
                    <div className="grid grid-cols-2 gap-2">
                      <IndustrialButton
                        onClick={editingId ? handleUpdateQuestion : handleAddQuestion}
                        variant="primary"
                        className="text-xs"
                      >
                        {editingId ? '保存' : '添加'}
                      </IndustrialButton>
                      <IndustrialButton
                        onClick={handleCancelForm}
                        className="text-xs"
                      >
                        取消
                      </IndustrialButton>
                    </div>
                  </div>
                )}

                {/* 题目列表 */}
                <div className="w-full bg-bg border border-border text-text-primary font-mono text-sm max-h-64 overflow-y-auto">
                  {questions.map((q, index) => (
                    <div key={q.id || index} className="py-2 px-3 border-b border-border last:border-b-0 group relative">
                      <div className="break-words pr-20">
                        <span className="text-text-secondary">{String(index + 1).padStart(2, '0')}.</span>{' '}
                        <span className="text-accent text-xs">[{q.category}]</span>{' '}
                        <span>{q.content}</span>
                        {q.isCustom && <span className="text-accent text-xs ml-2">[自定义]</span>}
                      </div>
                      {q.isCustom && (
                        <div className="absolute right-2 top-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEditQuestion(q)}
                            className="text-text-secondary hover:text-accent text-xs px-2 py-1 bg-surface border border-border"
                          >
                            编辑
                          </button>
                          <button
                            onClick={() => handleDeleteQuestion(q.id)}
                            className="text-text-secondary hover:text-accent text-xs px-2 py-1 bg-surface border border-border"
                          >
                            删除
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* 操作按钮 */}
                <div className="grid grid-cols-3 gap-2">
                  <IndustrialButton
                    onClick={() => setShowAddForm(true)}
                    className="text-xs"
                    disabled={showAddForm}
                  >
                    + 添加题目
                  </IndustrialButton>
                  <IndustrialButton
                    onClick={handleResetQuestions}
                    className="text-xs"
                  >
                    重置题库
                  </IndustrialButton>
                  <IndustrialButton
                    onClick={handleShuffleQuestions}
                    className="text-xs"
                  >
                    随机排序
                  </IndustrialButton>
                </div>
              </div>
            )}
          </div>

          <IndustrialButton
            variant="primary"
            onClick={handleStart}
            disabled={questionCount === 0}
            className="w-full"
          >
            Start Game
          </IndustrialButton>
        </div>
      </ModuleCard>
    </div>
  );
};
