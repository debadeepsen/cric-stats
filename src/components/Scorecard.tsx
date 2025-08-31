'use client'

import { InningsScorecard } from "@/types"

export const Scorecard = ({ scorecard }: { scorecard: InningsScorecard[] }) => {
  if (!scorecard || scorecard.length === 0) return <p>No scorecard data</p>

  return (
    <div className="space-y-10">
      {scorecard.map((inn) => (
        <div key={inn.innings} className="p-4 border rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-4">
            Innings {inn.innings}: {inn.team}
          </h2>

          {/* Batting Table */}
          <h3 className="font-semibold mb-2">Batting</h3>
          <table className="w-full border-collapse mb-6 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Batter</th>
                <th className="p-2 border">R</th>
                <th className="p-2 border">B</th>
                <th className="p-2 border">4s</th>
                <th className="p-2 border">6s</th>
                <th className="p-2 border">Dismissal</th>
              </tr>
            </thead>
            <tbody>
              {inn.batting.map((b) => (
                <tr key={b.batter}>
                  <td className="p-2 border">{b.batter}</td>
                  <td className="p-2 border text-center">{b.runs}</td>
                  <td className="p-2 border text-center">{b.balls}</td>
                  <td className="p-2 border text-center">{b.fours}</td>
                  <td className="p-2 border text-center">{b.sixes}</td>
                  <td className="p-2 border">{b.out}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Bowling Table */}
          <h3 className="font-semibold mb-2">Bowling</h3>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Bowler</th>
                <th className="p-2 border">O</th>
                <th className="p-2 border">R</th>
                <th className="p-2 border">W</th>
              </tr>
            </thead>
            <tbody>
              {inn.bowling.map((b) => (
                <tr key={b.bowler}>
                  <td className="p-2 border">{b.bowler}</td>
                  <td className="p-2 border text-center">{b.overs}</td>
                  <td className="p-2 border text-center">{b.runs}</td>
                  <td className="p-2 border text-center">{b.wickets}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}
